package org.pasut.android.games.pokemonlife.activities;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.inject.Inject;

import org.pasut.android.games.pokemonlife.R;
import org.pasut.android.games.pokemonlife.model.Pokemon;
import org.pasut.android.games.pokemonlife.services.PokemonService;
import org.roboguice.shaded.goole.common.collect.Iterables;
import org.roboguice.shaded.goole.common.collect.Iterators;

import java.util.List;

import roboguice.activity.RoboFragmentActivity;
import roboguice.inject.ContentView;

@ContentView(R.layout.activity_map)
public class MapActivity extends RoboFragmentActivity
        implements OnMapReadyCallback, LocationListener, GoogleMap.OnCameraChangeListener {
    private final static String TAG = MapActivity.class.getSimpleName();

    private final static int PERMISSION_LOCATION_REQUEST = 1556;
    private final static float MIN_ZOOM = 14.0f;
    private double lat;
    private double lon;
    private boolean hasLocation = false;

    List<Pokemon> pokemons;
    private boolean mapIsready;
    private GoogleMap map;

    @Inject
    private PokemonService pokemonService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MapFragment mapFragment = (MapFragment) getFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        LocalBroadcastManager.getInstance(this).registerReceiver(searchReceiver,
                new IntentFilter(PokemonService.FIND_ALL_POKEMONS));
        pokemonService.findAll();
        prepareLocationService();
    }

    private void prepareLocationService() {
        LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        try {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 0, this);
        } catch (SecurityException e) {
            Log.e(TAG, "Not permissions for geolocation");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, PERMISSION_LOCATION_REQUEST);
            } else {
            }
        }
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == PERMISSION_LOCATION_REQUEST) {
            if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                    && checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    public void requestPermissions(@NonNull String[] permissions, int requestCode)
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for Activity#requestPermissions for more details.
                return;
            }
            prepareLocationService();
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mapIsready = true;
        map = googleMap;
        map.setOnCameraChangeListener(this);
        if (pokemons != null) {
            populatePokemons(pokemons, map);
        }
    }

    @Override
    protected void onDestroy() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(searchReceiver);
        pokemonService.destroy();
        super.onDestroy();
    }

    private final BroadcastReceiver searchReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
        pokemons = intent.getExtras().getParcelableArrayList("data");
        if (mapIsready) {
            populatePokemons(pokemons, map);
        }
        }
    };

    private void populatePokemons(final List<Pokemon> pokemons, final GoogleMap map) {
        String[] names = getResources().getStringArray(R.array.pomemon_names);
        for (Pokemon pokemon : pokemons) {
            map.addMarker(new MarkerOptions()
                    .position(new LatLng(pokemon.getLat(), pokemon.getLon()))
                    .title(names[pokemon.getType()]));
        }
    }

    @Override
    public void onLocationChanged(Location location) {
        if(mapIsready) {
            CameraUpdate center=
                    CameraUpdateFactory.newLatLng(new LatLng(location.getLatitude(),
                            location.getLongitude()));
            map.moveCamera(center);
        }
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    @Override
    public void onCameraChange(CameraPosition position) {
        Log.d(TAG, "Zoom: " + position.zoom);
        if (position.zoom < MIN_ZOOM) {
            map.animateCamera(CameraUpdateFactory.zoomTo(MIN_ZOOM));
        }
    }
}
