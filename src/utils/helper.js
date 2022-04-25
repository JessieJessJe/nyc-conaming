

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


export const groupColor ={
    "-1":0xcccccc,
    "0":0x8029a6,
    "1":0x9ca2ff,
    "2":0xfc53bc,
    "3":0xb20061,
    "4":0x3440eb,
    "5":0xffcf0a, 
    "6":0x2deb36,
    "7":0x34ebeb,
    "8":0xe67a00};

export function getGroupColor(){
    console.log(
        Object.values(groupColor).map( hex => '#' + hex.toString(16) ), 'color function'
    )
  return Object.values(groupColor).map( hex => '#' + hex.toString(16) )
}


export function normZ(year){

    var norm = (year - 2000 + 3)* 1.5
    return norm
    }


export function filterYear(data, year){

        return year.includes("all") ? data : 
      
          data.filter( d =>{
            return year.includes(d.year)
          })
      
      }
      
export function filterBorough(data, borough){
        // return borough === "all" ? data : data.filter(d => d.borough == borough);
      
        return borough.includes("all") ? data : 
      
        data.filter( d =>{
          return borough.includes(d.borough)
        })
      
      }

export function filterSearch(data, term){
    return data.filter( d=>{
        return d.coname.includes(term) || d.location.includes(term)
    })
}
      
function filterTheme(data, term){
//term are the words to filter OUT

    return data.filter(d => {

        let result = true;

        term.forEach( f =>{
            if (f !== "" && d.reason.includes(f)) result = false;  
        })
        return result;
    })
}

export function filterData(data, filter){
        let data_theme = filterTheme( data, filter["theme"])
        let data_filtered_year = filterYear(data_theme, filter["year"])
        let data_filtered_borough = filterBorough(data_filtered_year, filter["borough"])
        
        if (filter["search"] === null){
            return data_filtered_borough;
        }else{
            return filterSearch(data_filtered_borough, filter["search"]);

        }

      }

export const initFilter = {
        "year":["all"],
        "borough":["all"],
        "angle":["map"],
        "theme":[""],
        "search":null,
        "reset": false,
    }

export function getPureFilter(filter){
   return Object.keys(filter)
          .filter( k => k !== "reset")
          .reduce((obj, key) =>{
              return Object.assign(obj, {
                  [key]: filter[key]
              })
          }, {})
}

export function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}