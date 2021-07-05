import express from 'express';
import configuration from '../config';
export interface urlEncodedParamInterface {
    extended?: boolean
}
export default (options?: urlEncodedParamInterface) => {
    if (!options) {
        options = {
            extended:true
        }
    } else {
        if (!options.extended) options.extended = configuration.express.default_url_encoding_extended || true;
    }
    return express.urlencoded(options)
}