

export function normLat(lat){

    const min = 40.5409949
    const max = 40.86892

    var norm = ((lat-min) / (max - min) * 50 -25)*3.5
    return norm
    }

export function normLong(long){

    const min = -73.72609609999999
    const max = -74.2297827

    var norm = ((long-min) / (max - min) * 50 -25)*3.5
    return norm
    }