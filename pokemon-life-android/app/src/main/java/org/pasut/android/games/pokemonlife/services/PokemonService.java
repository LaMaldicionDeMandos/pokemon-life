package org.pasut.android.games.pokemonlife.services;

import android.content.Context;
import android.content.Intent;
import android.os.Parcelable;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.google.inject.Inject;
import com.octo.android.robospice.persistence.exception.SpiceException;
import com.octo.android.robospice.request.listener.RequestListener;

import org.pasut.android.games.pokemonlife.model.Pokemon;
import org.pasut.android.games.pokemonlife.services.rest.RestService;
import org.roboguice.shaded.goole.common.base.Preconditions;

import java.util.ArrayList;
import java.util.List;

import roboguice.inject.ContextSingleton;

/**
 * Created by boot on 6/29/16.
 */
@ContextSingleton
public class PokemonService implements Destroyable {
    private final static String TAG = PokemonService.class.getSimpleName();
    public final static String FIND_ALL_POKEMONS = "find_all_pokemons";

    private Context context;
    private RestService restService;

    @Inject
    public PokemonService(final Context context, final RestService restService) {
        this.restService = restService;
        this.restService.start(context);
        this.context = Preconditions.checkNotNull(context);
    }

    public void findAll() {
        restService.allPokemons(new PokemonsListener());
    }

    @Override
    public void destroy() {
        this.context = null;
        this.restService.shouldStop();
        this.restService = null;
    }

    protected <T> void sendList(final String event, List<T> list) {
        final Intent intent = new Intent(event);
        intent.putParcelableArrayListExtra("data", (ArrayList<? extends Parcelable>) list);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }

    protected void send(final String event, String result) {
        final Intent intent = new Intent(event);
        intent.putExtra("data", result);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }

    protected <T extends Parcelable> void send(final String event, T result) {
        final Intent intent = new Intent(event);
        intent.putExtra("data", result);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }

    class PokemonsListener implements RequestListener<List<Pokemon>> {
        @Override
        public void onRequestFailure(SpiceException spiceException) {
            Log.e(TAG, "Searching Markets: " + spiceException.getMessage());
            sendList(FIND_ALL_POKEMONS, new ArrayList<Pokemon>());
        }

        @Override
        public void onRequestSuccess(List<Pokemon> pokemons) {
            sendList(FIND_ALL_POKEMONS, pokemons);
        }
    }
}
