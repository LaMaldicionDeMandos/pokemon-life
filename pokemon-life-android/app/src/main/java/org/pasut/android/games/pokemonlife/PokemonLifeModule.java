package org.pasut.android.games.pokemonlife;

import com.google.inject.Binder;
import com.google.inject.Module;
import com.octo.android.robospice.SpiceManager;

import org.pasut.android.games.pokemonlife.services.PokemonService;
import org.pasut.android.games.pokemonlife.services.rest.RestService;

/**
 * Created by boot on 6/25/16.
 */
public class PokemonLifeModule implements Module {
    @Override
    public void configure(Binder binder) {
        binder.bind(SpiceManager.class).toProvider(SpiceProvider.class);
        binder.bind(RestService.class);
        binder.bind(PokemonService.class);
    }
}
