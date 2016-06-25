package org.pasut.android.games.pokemonlife.services.rest;

import com.google.api.client.http.HttpRequest;
import com.octo.android.robospice.persistence.DurationInMillis;
import com.octo.android.robospice.request.googlehttpclient.GoogleHttpClientSpiceRequest;

/**
 * Created by boot on 6/25/16.
 */
public class FindAllPokemonsRequest extends GoogleHttpClientSpiceRequest<String> {
    protected final String url;
    protected final String path;

    public FindAllPokemonsRequest(final String protocol, final String host, final int port,
                           final String path, final Class<String> clazz) {
        super(clazz);
        this.url = protocol + "://" + host + ":" + port + "/";
        this.path = this.url + path;
    }

    /* TODO
    @Override
    public String loadDataFromNetwork() throws Exception {
        HttpRequest request = getHttpRequestFactory()
                .buildGetRequest(new GenericUrl(path));
        request.setParser(new GsonFactory().createJsonObjectParser());
        HttpResponse response = request.execute();
        List<Market> result = (List<Market>) response.parseAs(type);
        return result;
    }
*/
    public String cacheKey() {
        return path;
    }

    public long cacheDuration() {
        return DurationInMillis.ONE_MINUTE;
    }
}
