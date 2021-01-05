//Bai 1
function removeDup(arr1, arr2){
    let union = arr1.concat(arr2);
    let result = [];
    for (let i = 0; i < union.length; i++) {
        const element = union[i];
        if (!arr1.includes(element) || !arr2.includes(element)){
            result.push(element)
        }
    }
    return result
}


console.log(removeDup([1,2,"a"],[1,3,"b"]));



//bai 2
function sortRank(list){
    let result = list.concat();
    let sortedList = list.sort(function(elem1, elem2){
        if (elem1.points === elem2.points){
            return elem1.GD - elem2.GD
        }
        return elem2.points - elem1.points
    })
    for (let i = 0; i < result.length; i++) {
        const elem = result[i];
        elem.position = sortedList.findIndex(x => x.name === elem.name) + 1
    }
    return result;
}



let teamList = [
    {
        name: "Arsenal",
        points: 99,
        GD: 45
    },
    {
        name: "Chelsea",
        points: 75,
        GD: 39
    },
    {
        name: "Manchester United",
        points: 60,
        GD: 29
    },
    {
        name: "Liverpool",
        points: 88,
        GD: 39
    }
]

console.log(sortRank(teamList));