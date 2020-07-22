// Déclaration d'une fonction
function addition(a,b,c) {
    return a+b+c;
}

// This function allows to read n, ? array T and M, 
// calculate average and display Max
function moyenne() {
    
    var n = prompt('Donner une valeur');
    while (n<=3) {
        n = prompt('Donner une valeur correcte de n');
    }

    console.log('La taille n ', n);

    var T = Array();
    var M = Array();
    for (var i = 0; i < n; i++) {
        T[i] = Number(prompt(`Donner la valeur de T[${i}] `));
        M[i] = Number(prompt(`Donner la valeur de M[${i}] `));

    }

    console.log('Le tableau T ', T);
    console.log('Le tableau M ', M);

    var nb = 0;
    var nb1 = 0;
    var s = 0;
    var s1 = 0;

    for (let i = 0; i < n; i++) {
        if (T[i]>=0) {
            nb = nb +1; // nb++;
            s = s+ T[i];
        }
        if (M[i]>=0) {
            nb1 = nb1 +1; // nb1++;
            s1 = s1+ M[i];
        }
    }

    console.log('nb ', nb);
    console.log('nb1 ', nb1);
    console.log('s ', s);
    console.log('s1 ', s1);
    

    var moy1,moy2 = 0;
    if(nb!=0){
        moy1 = s/nb;
    } 
    if(nb1!=0){
        moy2 = s1/nb1;
    }

    console.log('La valeur de moy1 ', moy1);
    console.log('La valeur de moy2 ', moy2);
    if (moy1 > moy2) {
        alert('La moyenne du tableau T est la supérieure')
    } else if  (moy1 < moy2){
        alert('La moyenne du tableau M est la supérieure')
    } else {
        alert('Les moyennes des deux tableaux sont égales')
    }

}

//Appel d'une fonction
var x = moyenne(12,17,89);
var y = moyenne(115,7,18);


