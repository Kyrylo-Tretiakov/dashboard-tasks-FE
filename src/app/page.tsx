'use client'
import withProtectedRoute from "@/shared/model/withProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function RootPage() {
  return (
    <></>
  );
};


export default withProtectedRoute(RootPage);



// const test = {
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4,
//   f: 'f'
// }

// const testArr = [100, 300, 500, 600, 700];

// const swapKeyAndValue = (obj: Record<string | number, number | string>) => {
//   const swappedObj: Record<string | number, number | string> = {};


//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       console.log(key, 11111)
//       swappedObj[obj[key]] = key;
//     }

//   }
//   return swappedObj;
// }

// const arr = [
//   {
//     id: "bill",
//     from: "building1",
//     to: "building2"
//   },
//   {
//     id: "jen",
//     from: "building2",
//     to: "building1"
//   },
//   {
//     id: "jack",
//     from: "building4",
//     to: "building3"
//   },
//   {
//     id: "john",
//     from: "building3",
//     to: "building4"
//   }
// ]

// const calcArray = (arr: number[]) => {
//   const sum = arr.reduce((acc, item) => acc + item, 0);
//   return {
//     min: Math.min(...arr),
//     max: Math.max(...arr),
//     sum,
//     average: sum / arr.length
//   }
// }

// const swapParkingPlace = (arr: any) => {
//   const pairs: any = [];

//   for (const prevPerson of arr) {
//     for (const nextPerson of arr) {
//       if (pairs.flat().includes(nextPerson.id)) {
//         continue;
//       }
//       if (prevPerson.to === nextPerson.from && nextPerson.to === prevPerson.from) {
//         pairs.push([prevPerson.id, nextPerson.id]);
//       }
//     }
//   }
//   return pairs;
// }

// useEffect(() => {
//   const res = swapParkingPlace(arr);
//   console.log(res, 123231231);

// }, [])



// const test = {
//   value: 1,
//   children: [
//     {
//       value: 2,
//       children: [
//         {
//           value: 4
//         }
//       ]
//     },
//     {
//       value: 5,
//       children: [
//         {
//           value: 6
//         }
//       ]
//     }
//   ]
// }


// const getAllValuesFromNestedObj = (tree: any) => {
//   const stack: any = [tree];
//   const result = [];

//   while (stack.length > 0) {
//     const node: any = stack.pop();
//     if (node?.value !== undefined) {
//       result.push(node.value)
//     }
//     if (node.children?.length) {
//       stack.push(...node?.children)
//     }
//   }
//   return result;
// }
