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
    var indexList = 0
    if (typeof DB_LIST === 'undefined'){
        DB_LIST = [[0, 0, 0]];
        for(var line = 0; line < DB_LIST_EXCLUDE.length; line++){
            for (var q = 1; q <= 80; q++){
                flag = false;
                for (var values = 0; values < DB_LIST_EXCLUDE[line][2].length; values++){
                    if (q === DB_LIST_EXCLUDE[line][2][values]){
                        flag = true;
                        break;
                    }
                }
                if (!flag){
                    DB_LIST.push([DB_LIST_EXCLUDE[line][0], DB_LIST_EXCLUDE[line][1], q]);
                }
            }
        }
    }
    indexList = [...Array(DB_LIST.length - 1).keys()].map(i => ++i);;
    return shuffleAry(indexList);
}

window.onload = function(){
    var q = document.getElementById("question");
    q.innerHTML = "0 / "+ randomDBList.length;
}

function OnSubmit(val = 0){
    var num = parseInt(document.forms.input_form.number.value);
    if (isNaN(num)){
        alert("数字を入力してください。");
        return false;
    }

    var maxValue = DB_LIST.length - 1;
    if (1 > num || maxValue < num){
        alert("1から"+ maxValue +"までの値を入力してください。");
        return false;
    }

    if (DB_LIST[num][0] === -1 && val !== 0){
        if (val < 0){
            document.forms.input_form.number.value--;
        }
        else if (val > 0){
            document.forms.input_form.number.value++;
        }
        return OnSubmit(val);
    }
    var link = makeLink(num);

    if (document.forms.input_form.newpage.checked){
        window.open(link, "_blank");
    }
    else{
        document.getElementById("newsframe").src = link;
    }
    return true;
}

function OnNext(){
    var num = parseInt(document.forms.input_form.number.value);
    if (!isNaN(num)){
        if (num + 1 < DB_LIST.length){
            document.forms.input_form.number.value++;
            if (!OnSubmit(1)){
                document.forms.input_form.number.value = num;
            }
        }
    }
}

function OnBefore(){
    var num = parseInt(document.forms.input_form.number.value);
    if (!isNaN(num)){
        if (num - 1 < DB_LIST.length && num - 1 > 0){
            document.forms.input_form.number.value--;
            if (!OnSubmit(-1)){
                document.forms.input_form.number.value = num;
            }
        }
    }
}

function OnRandom(){
    if (randomIndex > randomDBList.length - 1){
        randomDBList = getRandomIndex();
        randomIndex = 0;
    }
    if (DB_LIST[randomDBList[randomIndex]][0] === -1){
        randomIndex++;
        OnRandom();
        return;
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

    if (DB_LIST[num][1] === 3){
        return DB_LIST[num][2];
    }
    if (DB_LIST[num][0] > 2000){
        // 基本情報技術者試験
        if (DB_LIST[num][1] === 1){
            season = "aki";
        }
        else if (DB_LIST[num][1] === 2){
            season = "toku"
        }
        // 応用情報技術者試験
        else if (DB_LIST[num][1] === 4){
            season = "haru"
            url = "https://www.ap-siken.com/kakomon/";
        }
        else if (DB_LIST[num][1] === 5){
            season = "aki"
            url = "https://www.ap-siken.com/kakomon/";
        }
        else if (DB_LIST[num][1] === 6){
            season = "toku"
            url = "https://www.ap-siken.com/kakomon/";
        }
        if (document.forms.input_form.smartphone.checked){
            if (DB_LIST[num][1] > 3) {
                url = "https://www.ap-siken.com/s/kakomon/";
            }
            else{
                url = "https://www.fe-siken.com/s/kakomon/";
            }
        }

        return url + year +"_"+ season +"/"+ question +".html";
    }
    else{
        url = "http://www.bohyoh.com/ITEE/FIT/";
        year = DB_LIST[num][0];
        season = "A";
        question = "";
        if (DB_LIST[num][1] === 1){
            season = "B";
        }
        if (DB_LIST[num][2] < 10){
            question = "0"+ DB_LIST[num][2];
        }
        else{
            question = DB_LIST[num][2];
        }

        return url + year + season+ "/FIT"+ year + season +"A"+ question +".html";
    }
}