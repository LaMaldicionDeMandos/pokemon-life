package org.pasut.android.games.pokemonlife.services.rest;

import android.content.Context;

import com.octo.android.robospice.SpiceManager;
import com.octo.android.robospice.request.listener.RequestListener;

import org.pasut.android.games.pokemonlife.R;
import org.pasut.android.games.pokemonlife.model.Pokemon;

import java.util.List;

/**
 * Created by boot on 6/29/16.
 */
public class RestService {
    private final SpiceManager spice;
    private final String protocol;
    private final String host;
    private final int port;

    public RestService(final SpiceManager spice, final Context context) {
        this.spice = spice;
        this.protocol = context.getString(R.string.protocol);
        this.host = context.getString(R.string.host);
        this.port = context.getResources().getInteger(R.integer.port);

    }

    private <T> void executeRequest(AbstractRequest<T> request, RequestListener<T> listener) {
        spice.execute(request, request.cacheKey(), request.cacheDuration(), listener);
    }

    public void allPokemons(final RequestListener<List<Pokemon>> listener) {
        executeRequest(new FindAllPokemonsRequest(protocol, host, port), listener);
    }
}
