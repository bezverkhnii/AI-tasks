class Point {
    constructor(x, y, distance, name) {
      this.x = x; // X-coordinate of point
      this.y = y; // Y-coordinate of point
      this.distance = distance; // Distance from test point
      this.name = name; //name of this Point
    }
  }


    function shortestPath(arr, p){
        let finalPay = 0;
        const paths = ['A'] //creating a path-array in sorted way
        while (arr.length > 0){ //iterating while array length > 0

            const distArr = []; //creating an array of distance 
            let min = 0; //declarating the minimum distance 
            for(let i = 0; i < arr.length; i++){ //itearting through each Point.distance and adding them to array
                arr[i].distance = Math.sqrt((arr[i].x - p.x) * (arr[i].x - p.x) + (arr[i].y - p.y) * (arr[i].y - p.y));
                distArr.push(arr[i].distance)
                console.log(arr[i]); //logging every array to console
            }
            min += Math.min(...distArr); //addind the smallest number to 0
            for(let i = 0; i < distArr.length; i++){//iterating through distance array
                if(arr[i].distance === min){ //check if distance is equal to min
                    p = arr[i]; //assigning new value to starting point
                    paths.push(p.name) //pushing this point to array in right order
                    finalPay += p.distance;//adding value of distance so we will end up with finalPay value
                    arr.splice(arr.indexOf(arr[i]), 1) //removing this point from main array
                    break //stop iteration
                }
            }
            console.log(`The route is: ${paths.join(' => ')} which travel cost is: ${finalPay} points}`) //logging each iteration result

        }
        let result = { route: paths.join(' => '), cost: `${finalPay} points` }
        return result //return final result
    }



//starting the code with following task agruments
let n = 6;
const arr = new Array(n);
for (let i = 0; i < 6; i++) {
    arr[i] = new Point();
  }

  arr[0].x = 5;
  arr[0].y = 8;
  arr[0].name = 'B';
   
  arr[1].x = 7;
  arr[1].y = 12;
  arr[1].name = 'C';
   
  arr[2].x = 2;
  arr[2].y = 9;
  arr[2].name = 'D';
   
  arr[3].x = 7;
  arr[3].y = 2;
  arr[3].name = 'E';
   
  arr[4].x = 1;
  arr[4].y = 12;
  arr[4].name = 'F';

  arr[5].x = 4;
  arr[5].y = 2;
  arr[5].name = 'G';

let p = {
    x: 1,
    y:1,
    name:"A"
}

shortestPath(arr,p) //call function 
