package org.pasut.android.games.pokemonlife;

import android.app.Application;

import roboguice.RoboGuice;

/**
 * Created by boot on 6/25/16.
 */
public class PokemonLifeApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        RoboGuice.setUseAnnotationDatabases(false);
        RoboGuice.getOrCreateBaseApplicationInjector(this, RoboGuice.DEFAULT_STAGE,
                RoboGuice.newDefaultRoboModule(this), new PokemonLifeModule());
    }
}
