package org.pasut.android.games.pokemonlife.services.rest;

import com.octo.android.robospice.persistence.DurationInMillis;
import com.octo.android.robospice.request.googlehttpclient.GoogleHttpClientSpiceRequest;

/**
 * Created by boot on 6/29/16.
 */
public abstract class AbstractRequest<T> extends GoogleHttpClientSpiceRequest<T> {
    protected final String url;
    protected final String path;

    public AbstractRequest(final String protocol, final String host, final int port,
                           final String path, final Class<T> clazz) {
        super(clazz);
        this.url = protocol + "://" + host + ":" + port + "/";
        this.path = this.url + path;
    }

    public String cacheKey() {
        return path;
    }

    public long cacheDuration() {
        return DurationInMillis.ONE_MINUTE;
    }
}
