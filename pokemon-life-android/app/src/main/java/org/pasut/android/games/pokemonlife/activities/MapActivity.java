package org.pasut.android.games.pokemonlife.activities;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.inject.Inject;

import org.pasut.android.games.pokemonlife.R;
import org.pasut.android.games.pokemonlife.model.Pokemon;
import org.pasut.android.games.pokemonlife.services.PokemonService;

import java.util.List;

import roboguice.activity.RoboFragmentActivity;
import roboguice.inject.ContentView;

@ContentView(R.layout.activity_map)
public class MapActivity extends RoboFragmentActivity implements OnMapReadyCallback {
    private final static String TAG = MapActivity.class.getSimpleName();
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
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {

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
            List<Pokemon> pokemons = intent.getExtras().getParcelableArrayList("data");
            Log.d(TAG, "Populating pokemons: " + pokemons);
        }
    };
}
