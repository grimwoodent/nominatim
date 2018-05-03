import * as superagent from 'superagent';

// from: https://wiki.openstreetmap.org/wiki/Nominatim#Parameters_2
export interface INominatimParams {
  format?: 'html' | 'json' | 'xml' | 'jsonv2'
  json_callback?: string
  accept_language?: string
  'accept-language'?: string
  q: string
  street?: string
  city?: string
  state?: string
  country?: string
  viewbox?: string
  postalcode?: string
  countryCodesArray?: string[]
  countrycodes?: string
  bounded?: 0 | 1,
  polygon?: 0 | 1,
  addressdetails?: 0 | 1,
  email?: string,
  exclude_place_ids?: string,
  limit?: number,
  dedupe?: 0 | 1
}

export interface INominatimResult {
  place_id: string
  osm_id: string
  osm_type: string
  boundingbox?: string[4]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon: string
  address: {
    house_number?: string
    road?: string
    neighbourhood?: string
    suburb?: string
    city_district?: string
    city: string
    county?: string
    state: string
    country: string
    country_code: string
    postcode?: string
    peak?: string
    bakery?: string
    electronics?: string
  }
}

// https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding
export interface INominatimReverseParams {
    format?: 'html' | 'json' | 'xml' | 'jsonv2';
    json_callback?: string;
    accept_language?: string;
    'accept-language'?: string;
    osm_type?: 'N' | 'W' | 'R';
    osm_id?: number;
    lat?: number;
    lon?: number;
    zoom?: number;
    addressdetails?: 0 | 1;
    email?: string;
    polygon_geojson?: 1;
    polygon_kml?: 1;
    polygon_svg?: 1;
    polygon_text?: 1;
    extratags?: 1;
    namedetails?: 1;
}

export class NominatimJS {

  public static async search(params: INominatimParams): Promise<INominatimResult[]> {
    params.format = params.format || 'json';

    // transform country codes array
    if (params.countryCodesArray) {
      params.countrycodes = params.countryCodesArray.join(',');
    }

    // transform accept-language
    if (params.accept_language) {
      params['accept-language'] = params.accept_language;
    }

    return await superagent
      .get('https://nominatim.openstreetmap.org/search')
      .query(params)
      .then(res => res.body || []);
  }

    public static async reverse(params: INominatimReverseParams): Promise<INominatimResult> {
        params.format = params.format || 'json';

        // transform accept-language
        if (params.accept_language) {
            params['accept-language'] = params.accept_language;
        }

        return await superagent
            .get('https://nominatim.openstreetmap.org/reverse')
            .query(params)
            .then(res => res.body || []);
    }

}