

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

export  const groupColor ={
        "-1":0xcccccc,
        "0":0x3440eb,
        "1":0x9ca2ff,
        "2":0xfc53bc,
        "3":0xb20061,
        "4":0x3440eb,
        "5":0xffcf0a, 
        "6":0x3440eb,
        "7":0x34ebeb,
        "8":0xe67a00};



export function normZ(year){

    var norm = (year - 2000 + 3)* 1.5
    return norm
    }