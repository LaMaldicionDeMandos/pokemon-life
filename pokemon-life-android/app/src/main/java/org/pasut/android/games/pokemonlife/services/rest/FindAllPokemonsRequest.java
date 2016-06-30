package org.pasut.android.games.pokemonlife.services.rest;

import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Lists;
import com.google.gson.reflect.TypeToken;
import com.octo.android.robospice.persistence.DurationInMillis;
import com.octo.android.robospice.request.googlehttpclient.GoogleHttpClientSpiceRequest;

import org.pasut.android.games.pokemonlife.model.Pokemon;

import java.lang.reflect.Type;
import java.util.List;

/**
 * Created by boot on 6/25/16.
 */
public class FindAllPokemonsRequest extends AbstractRequest<List<Pokemon>> {

    private final static Class<List<Pokemon>> getClazz() {
        List<Pokemon> list = Lists.newArrayList();
        return (Class<List<Pokemon>>)list.getClass();
    }

    private final static Type type = new TypeToken<List<Pokemon>>(){}.getType();


    public FindAllPokemonsRequest(final String protocol, final String host, final int port) {
        super(protocol, host, port, "pokemons", getClazz());
    }

    @Override
    public List<Pokemon> loadDataFromNetwork() throws Exception {
        HttpRequest request = getHttpRequestFactory()
                .buildGetRequest(new GenericUrl(path));
        request.setParser(new GsonFactory().createJsonObjectParser());
        HttpResponse response = request.execute();
        List<Pokemon> result = (List<Pokemon>) response.parseAs(type);
        return result;
    }

}
