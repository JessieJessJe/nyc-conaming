

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

export  const termlist = [
    //raw
    // ['american', 'award', 'street', 'people', 'island', 'states', 'united', 'officer', 'police', 'business'] //-1 group
    // ['music', 'jazz', 'band', 'carter', 'cruz', 'album', 'albums', 'latin', 'singer', 'recorded'],
    // ['tuskegee', 'air', 'squadron', 'airmen', 'fighter', 'aircraft', '1943', 'pilot', 'enemy', 'flying'],
    // ['italian', 'italy', 'edmond', 'safra', 'soccer', 'joseph', 'brothers', 'customers', 'family', 'business'],
    // ['women', 'ms', 'education', 'children', 'worked', 'council', 'harriet', 'program', 'health', 'board'],
    // ['anniversary', 'commemorate', '100th', 'naming', 'celebrating', 'kips', 'sign', 'barnard', 'significance', '125th'],
    // ['health', 'nq', 'uhp', 'peter', 'melrose', 'regreso', 'primary', 'care', 'gay', 'development'],
    // ['section', 'law', 'amend', 'map', 'rename', 'accordingly', 'called', 'repeals', 'corresponds', '2004'],
    // ['war', 'greenpoint', 'pier', 'korean', 'ruby', 'legion', 'island', 'coney', 'sangiorgio', 'army'],
    // ['league', 'jonathan', 'science', 'chema', 'charities', '52', 'catholic', 'baseball', 'casitas', 'bronx'],
    // ['september 11, 2001', '9/11', 'firefighter', 'fdny'],

    //modified 1
    // ['music', 'jazz', 'band', 'album', 'latin', 'singer'],
    // ['Tuskegee Airmen', 'squadron', 'fighter', 'aircraft', '1943', 'pilot'],
    // ['Italian', 'soccer', 'brothers', 'customers', 'family', 'business'],
    // ['women', 'Ms.', 'education', 'children', 'worked', 'council', 'health', 'board'],
    // ['anniversary', 'commemorate', '100th', 'naming', 'celebrating', 'significance'],
    // ['health', 'Nos Quedamos(WE STAY)', 'UHP', 'melrose', 'regreso', 'primary care', 'gay rights', 'development'],
    // ['section', 'law', 'amend', 'map', 'rename', 'accordingly', 'called', 'repeals', 'corresponds', '2004'],
    // ['Korean War', 'Greenpoint', 'pier', 'ruby', 'legion', 'Coney Island', 'sangiorgio', 'army'],
    // ['league', 'jonathan', 'science', 'chema', 'charities', '52', 'catholic', 'baseball', 'casitas', 'bronx'],
    // ['september 11, 2001', '9/11', 'firefighter', 'fdny'],

    ['music', 'jazz', 'band', 'album', 'latin', 'singer', 'art', 'arts' ,'culture', 'musicians', 'cuba'],
    ['tuskegee','Airmen', 'squadron', 'fighter', 'aircraft', '1943', 'pilot', 'world war II', 'Iraq', 'korean',
     'war', 'army', 'infantry', 'combat', 'medal', 'bronze'],
    ['women', 'Ms', 'education', 'children', 'equality', 'school'],
    ['customers', 'family', 'business', 'immigrants', 'immigration', 'community'],
    ["baptist", 'church', 'pastor', 'reverend', 'bishop','ministry', 'churches', 'bible', 'god', 'congregation'],
    ['health', 'public', "civic", 'UHP', 'primary care', 'gay', 'development', 'activists', 'hospitals', 'HIV', 'AIDS', 'HIV/AIDS', "COVID-19"],
    ['killed','duty', 'nypd', 'police'],
    ['COVID-19'],
    ['9/11']
]

export const group_titles= new Map([
    [-1, "Others"],
    [0, "The Record-breakings and Undergrounds"],
    [1, "Wounds of War and Violence"],
    [2, "Bridging the Gap to Equality "],
    [3, "We Call It Home"],
    [4, "Religion and Belief"],
    [5, "Public Health and Civic Rights"],
    [6, "Law and Order"],
    [7, "Era of Pandemic"],
    [8, "Heroes of 911"]
])



export const options_theme = [{ label: 'all', value: [''] },
                        {label: '0', value:['music', 'jazz', 'band', 'album', 'latin', 'singer', 'art', 'arts' ,'culture', 'cultural', 'musicians', 'cuba']},
                        {label: '1', value:['tuskegee','Airmen', '1943', 'pilot', 'world war II', 'Iraq', 'korean','war', 'army', 'killed', 'nypd', 'police']},                 
                        {label: '2', value:['women', 'Ms', 'education', 'children', 'worked', 'council', 'board', 'school','committee']},
                        {label: '3', value:['customers', 'family', 'business', 'immigrants', 'immigration', 'community']},
                        {label: '4', value:["baptist", 'church', 'pastor', 'reverend', 'bishop','ministry', 'churches', 'bible', 'god', 'congregation']},
                        {label: '5', value:['health', 'public', "civic",'nq', 'UHP', 'primary care', 'gay', 'development', 'activists', 'hospitals', 'HIV', 'AIDS', 'HIV/AIDS', "COVID-19"]},
                        {label: '6', value:['section', 'law', 'amend', 'map', 'rename', 'accordingly', 'called', 'repeals', 'corresponds', '2004']},
                        {label: '7', value:['COVID-19']},
                        {label: '8', value:['9/11']},
                   
                        {label: '-1', value: [''] },]

//subgroups
export const subgroups = [0,1,2,3,4,5,6,7,8, -1]

export const groupColor ={

    "-1":0x7C7C7C, //gray
    "0":0x82531A,
    "1":0x3247E2,
    "2":0x7E00AA,
    
    "3":0xD97F2E,

    "4":0xFF4DB2,
    "5":0x27CB00,

    "6":0xDF2941, 

    "7":0x17A6C6,
    "8":0x366419,

 };

export function getGroupColor(){
  return Object.values(groupColor).map( hex => '#' + hex.toString(16) )
}


export function normZ(year){

    // var norm = (year - 2000 + 3)* 1.5

    let norm = (year - 2000 ) * 3 + 5

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

export function updateNewFilter(filter, newFilter){

    let updateFilter = filter;
    updateFilter["group"] = newFilter["group"];
    

    return updateFilter
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