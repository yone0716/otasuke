var randomIndex = 0;
var randomDBList = getRandomIndex();

function shuffleAry(ary) {
    var i = ary.length;
    while(i){
      var j = Math.floor(Math.random()*i);
      var t = ary[--i];
      ary[i] = ary[j];
      ary[j] = t;
    }
    return ary;
}

function getRandomIndex(){
    randomIndex = 0;
    var indexList = [...Array(DB_LIST.length - 1).keys()].map(i => ++i);;
    return shuffleAry(indexList);
}

window.onload = function(){
    var q = document.getElementById("question");
    q.innerHTML = "0 / "+ randomDBList.length;
}

function OnSubmit(val = 1){
    var num = parseInt(document.forms.input_form.number.value);
    if (isNaN(num)){
        alert("数字を入力してください。");
        return;
    }

    var maxValue = DB_LIST.length;
    if (1 > num || maxValue < num){
        alert("1から"+ maxValue +"までの値を入力してください。");
        return;
    }

    var link = makeLink(num);

    if (document.forms.input_form.newpage.checked){
        window.open(link, "_blank");
    }
    else{
        document.getElementById("newsframe").src = link;
    }
}

function OnNext(){
    var num = parseInt(document.forms.input_form.number.value);
    if (!isNaN(num)){
        if (num + 1 < DB_LIST.length){
            document.forms.input_form.number.value++;
            OnSubmit(1);
        }
    }
}

function OnBefore(){
    var num = parseInt(document.forms.input_form.number.value);
    if (!isNaN(num)){
        if (num - 1 < DB_LIST.length && num - 1 > 0){
            document.forms.input_form.number.value--;
            OnSubmit(-1);
        }
    }
}

function OnRandom(){
    if (randomIndex > randomDBList.length - 1){
        randomDBList = getRandomIndex();
        randomIndex = 0;
    }
    var num = randomDBList[randomIndex];
    document.forms.input_form.number.value = num;
    var q = document.getElementById("question");
    q.innerHTML = randomIndex + 1 +" / "+ randomDBList.length;
    randomIndex++;
    OnSubmit();
}

function makeLink(num){
    var url = "https://www.fe-siken.com/kakomon/";
    var year = String(DB_LIST[num][0] - 1988);
    var season = "haru";
    var question = "q"+ String(DB_LIST[num][2]);
    if (DB_LIST[num][1] === 1){
        season = "aki";
    }
    else if (DB_LIST[num][1] === 2){
        season = "toku"
    }
    if (document.forms.input_form.smartphone.checked){
        url = "https://www.fe-siken.com/s/kakomon/";
    }

    return url + year +"_"+ season +"/"+ question +".html";
}