

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

export  const termlist = [['detective','nypd','9/11','police','recovery','september 11, 2001'],
    ['woman','polish','association','she'],                 
    ['staten island','business','career','board','jazz','council','league'],
    ['baptist','pastor','church', 'america','rabbi'],
    ['911 heroes'],
    ['september 11, 2001', 'fdny','firefighter'],
    ['gun','marine','9/11', 'combat','violence','police','september 11, 2001'],
    ['district','attorney','health',' hiv ',' human rights','hiv/aids'],
    ['school',' art ','civic','children','museum','award']]

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
  return Object.values(groupColor).map( hex => '#' + hex.toString(16) )
}


export function normZ(year){

    // var norm = (year - 2000 + 3)* 1.5

    let norm = (year - 2000 ) * 1.5 + 5

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


function filterGroup(data, group){
    return data.filter(d => group.includes( d.group))
}

//this func will called by hitting UPDATE btn in filter
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

export function filterNewData(data, filter){
        let data_group = filterGroup(data, filter["group"])
        let data_theme = filterTheme( data_group, filter["theme"])
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
        "angle":"map",
        "reset": false,
        "group":[1],
        "displaySelectedGroup": false
    }

//subgroups
export const subgroups = [0,1,2,3,4,5,6,7,8, -1]

export function initNewFilter(mydata, filter){
//!!!! data [{key:counts, key:counts, ...}] is a object in this case, in ARRAY
   let data = dataPrep(filterData(mydata, filter), subgroups)

   let initGroup = 0;

    for (const [key, value] of Object.entries(data[0])) {
        if (value > 0 && key > initGroup) initGroup = key
    }

   let newFilter = filter;
   newFilter["displaySelectedGroup"] = true;
   newFilter["group"]=[parseInt(initGroup)]

   console.log("this new filter", newFilter, "init group", initGroup)
   return newFilter
}

export function getOpacity(groupList, key){
    return groupList.includes(key) ? "1" : "0.5"
}

//the following func are called by barchart - to filter, update theme group
export function updateGroup(filter, group){

    let newDisplay, newGroup;

    //first click
    if (!filter["displaySelectedGroup"]){
       newDisplay = true;
       newGroup = filter["group"]
       newGroup.push(group)

    }else{

        //toggle groups

        if (filter["group"].includes(group)){

            newGroup = filter["group"].filter( g => g !== group)
            //check if the last to disappear
            if (newGroup.length === 0){
                newDisplay = false;
                newGroup = [];
            }  

        }else{
            newGroup = filter["group"]
            newGroup.push(group)
        }
    }

    return [newDisplay, newGroup];
}

///tbd -- when filter btn clicked
export function clearGroup(filter){
    filter["displaySelectedGroup"] = false;
    filter["group"]=[]
    return filter
}


export function dataPrep(data, subgroups){
    let arr = []
    let obj = {}
    subgroups.forEach( g => {
         let count = 0;
         data.forEach( d =>{
             if(d.group === g) count++
         })

        obj[g] = count
    })
    arr.push(obj)
    return arr
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