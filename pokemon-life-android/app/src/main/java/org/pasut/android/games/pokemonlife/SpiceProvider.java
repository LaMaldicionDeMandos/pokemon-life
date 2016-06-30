package org.pasut.android.games.pokemonlife;

import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.octo.android.robospice.SpiceManager;

import org.pasut.android.games.pokemonlife.services.RestSpiceService;

/**
 * Created by boot on 6/29/16.
 */
@Singleton
public class SpiceProvider implements Provider<SpiceManager> {
    @Override
    public SpiceManager get() {
        return new SpiceManager(RestSpiceService.class);
    }
}
