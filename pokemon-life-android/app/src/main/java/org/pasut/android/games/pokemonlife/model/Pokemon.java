package org.pasut.android.games.pokemonlife.model;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.api.client.util.Key;

/**
 * Created by boot on 6/29/16.
 */
public class Pokemon implements Parcelable {

    @Key
    private String id;
    @Key
    private float lon;
    @Key
    private float lat;
    @Key
    private int type;

    public Pokemon() {}

    public Pokemon(final String id, final float lat, final float lon, final int type) {
        this.id = id;
        this.lon = lon;
        this.lat = lat;
        this.type = type;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.id);
        dest.writeFloat(this.lat);
        dest.writeFloat(this.lon);
        dest.writeInt(this.type);
    }

    public Pokemon(final Parcel in) {
        this(in.readString(), in.readFloat(), in.readFloat(), in.readInt());
    }

    public static final Parcelable.Creator<Pokemon> CREATOR = new Parcelable.Creator<Pokemon>() {
        @Override
        public Pokemon createFromParcel(Parcel source) {
            return new Pokemon(source);
        }

        @Override
        public Pokemon[] newArray(int size) {
            return new Pokemon[size];
        }
    };

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getLon() {
        return lon;
    }

    public void setLon(float lon) {
        this.lon = lon;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
