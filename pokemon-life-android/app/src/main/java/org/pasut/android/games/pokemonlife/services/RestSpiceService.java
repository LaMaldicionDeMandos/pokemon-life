package org.pasut.android.games.pokemonlife.services;

import android.app.Application;

import com.octo.android.robospice.GoogleHttpClientSpiceService;
import com.octo.android.robospice.persistence.CacheManager;
import com.octo.android.robospice.persistence.exception.CacheCreationException;
import com.octo.android.robospice.persistence.googlehttpclient.json.GsonObjectPersisterFactory;

/**
 * Created by boot on 6/25/16.
 */
public class RestSpiceService extends GoogleHttpClientSpiceService {
    @Override
    public CacheManager createCacheManager(Application application) throws CacheCreationException {
        CacheManager cacheManager = new CacheManager();
        GsonObjectPersisterFactory gsonFactory = new GsonObjectPersisterFactory(application);

        cacheManager.addPersister(gsonFactory);

        return cacheManager;
    }

    @Override
    public int getThreadCount(){
        return 6;
    }
}
