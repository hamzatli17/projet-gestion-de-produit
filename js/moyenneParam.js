function moyenneParam(T,M) {
    
    console.log('Le tableau T ', T);
    console.log('Le tableau M ', M);

    var nb = 0;
    var nb1 = 0;
    var s = 0;
    var s1 = 0;

    for (let i = 0; i < T.length; i++) {
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

function resultat(math, phy, chimie) {
    const coeffMath = 3;
    const coeffPhy = 2;
    const coeffChimie = 1.5;

    var moy = (math*coeffMath+phy*coeffPhy+chimie*coeffChimie)/ (coeffChimie+coeffMath+coeffPhy);
    console.log('La moyenne est égale à ', moy);
    if (moy >=10) {
        alert('Success' + moy);
    } else {
        alert('Fail' +moy);
    }
}