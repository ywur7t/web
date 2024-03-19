let GetSummary = (...args)=>{

    let sum = 0
    let position = 0
    let str = ''

    for (let i=0; i< args.length; i++) {
        args[i]+=' '
        position = 0

        while (args[i].indexOf(' ', position + 1) != -1) {
            let Old_Postion = position
            position = args[i].indexOf(' ', position)
            str = args[i].slice(Old_Postion, position++)

            if(!(isNaN(parseInt(str)) || !isFinite(str))) {
                if(Math.abs(+str) >=10 && Math.abs(+str)<=99)
                    sum+= Number(str)
            }


            // if(str.length == 2){
            //     if(!(isNaN(parseInt(str)) || !isFinite(str))) 
            //         sum += +str
            // }
        } 
    }
    return sum
}

console.log('sum = ',GetSummary('11 22 ff -ff 33 44 -55 fff 4 1 4954 9 66 77 88 99','dlfbndflvn12 23 63 -44 -55 -11 -33 2 3 4 5 -2'))

