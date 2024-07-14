isClicked = false;
inputs = ["#sd", "#dd", "#bpm", "#weight", "#age", "#height", "#sex"]

let performData = function() {
    if (variablesExam()) {
        for (let i = 0; i < inputs.length; i++) {
            document.querySelector(inputs[i]).style.background = "#ffffff";
        }
        document.querySelector('#error').style.height = 0;
        document.querySelector('#error').style.margin = 0;
        document.querySelector('.error-message').style.transition = "0.2s";
        document.querySelector('.error-message').style.opacity = 0;

        document.querySelector('.enter-inp2').style.display = "inline-block";
        document.querySelector('.enter-inp').style.marginRight = "6px";

        moveTable();
        if (isClicked) {
            setTimeout(show, 1100);
        }
    }
    else {
        document.querySelector('#error').style.height = "77px";
        document.querySelector('#error').style.transition = "0.5s";
        document.querySelector('#error').style.marginBottom = "12px";
        document.querySelector('.error-message').style.height = "77px";
        document.querySelector('.error-message').style.transition = "3s";
        document.querySelector('.error-message').style.opacity = 1;
        
    }
}

let variablesExam = function() {
    sd = document.getElementById("sd").value;
    dd = document.getElementById("dd").value;
    bpm = document.getElementById("bpm").value;
    weight = document.getElementById("weight").value;
    age = document.getElementById("age").value;
    height = document.getElementById("height").value;
    sex = document.getElementById("sex").value;
    drug = document.getElementById("drug").checked;

    // console.log("---------")
    // console.log(sd);
    // console.log(dd);
    // console.log(bpm);
    // console.log(weight);
    // console.log(age);
    // console.log(height);
    // console.log(sex);
    // console.log(drug);
    // console.log("---------")

    errors = [];
    exam = true;

    if (sd == '' || isNaN(sd) || 90 > parseInt(sd) || parseInt(sd) > 250){  
        errors.push("#sd")
        exam = false;
    } 

    if (dd == '' || isNaN(dd) || 60 > parseInt(dd) || parseInt(dd) > 140) {
        errors.push("#dd")
        exam = false;
    }
    
    if (bpm == '' || isNaN(bpm) || 40 > parseInt(bpm) || parseInt(bpm) > 180) {
        errors.push("#bpm")
        exam = false;
    }
    
    if (weight == '' || isNaN(weight) || 40 > parseInt(weight)) {
        errors.push("#weight")
        exam = false;
    }
    
    if (age == '' || isNaN(age) || 14 > parseInt(age) || parseInt(age) > 90) {
        errors.push("#age")
        exam = false;
    }
    
    if (height == '' || isNaN(height) || 150 > parseInt(height) || parseInt(height) > 205) {
        errors.push("#height")
        exam = false;
    }
    
    if (sex == "none") {
        errors.push("#sex")
        exam = false;
    }

    // console.log(errors)
    for (let i = 0; i < inputs.length; i++) {
        document.querySelector(inputs[i]).style.background = "#ffffff";
    }

    for (let i = 0; i < errors.length; i++) {
        document.querySelector(errors[i]).style.background = "#ffc6c6";
    }
    return exam
}

let moveTable = function() {
    if(!isClicked){
        document.querySelector('#but').textContent = 'Сброс';
        document.querySelector('#but').style.background = "#ffc6c6";
        document.querySelector('#data-plate').style.width = "1000px";
        isClicked = true;
    }
    else{
        document.querySelector('#but').textContent = 'Ввод';
        document.querySelector('#but').style.background = "#78b4f8";
        document.querySelector('#data-plate').style.width = "0";

        document.getElementById("sd").value = '';
        document.getElementById("dd").value = '';
        document.getElementById("bpm").value = '';
        document.getElementById("weight").value = '';
        document.getElementById("age").value = '';
        document.getElementById("height").value = '';
        document.getElementById("sex").value = "none";
        document.getElementById("drug").checked = false;

        document.querySelector("#top1").style.opacity = 0;
        document.querySelector("#bot1").style.opacity = 0;
        document.querySelector("#top2").style.opacity = 0;
        document.querySelector("#bot2").style.opacity = 0;
        document.querySelector("#top3").style.opacity = 0;
        document.querySelector("#bot3").style.opacity = 0;       

        setTimeout(offOnResults(false), 1000);

        document.querySelector("#top1").innerHTML = "";
        document.querySelector("#bot1").innerHTML = "";
        document.querySelector("#top2").innerHTML = "";
        document.querySelector("#bot2").innerHTML = "";
        document.querySelector("#top3").innerHTML = "";
        document.querySelector("#bot3").innerHTML = "";

        document.querySelector('.enter-inp2').style.display = "none";
        document.querySelector('.enter-inp').style.marginRight = "auto";

        isClicked = false;
    }
}

let show = function() {
    sd = parseInt(document.getElementById("sd").value);
    dd = parseInt(document.getElementById("dd").value);
    bpm = parseInt(document.getElementById("bpm").value);
    weight = parseInt(document.getElementById("weight").value);
    age = parseInt(document.getElementById("age").value);
    height = parseInt(document.getElementById("height").value);
    vsex = document.getElementById("sex").value;
    drug = document.getElementById("drug").checked;
    
    pd = sd - dd  // Пульсовое давление

    so = Math.round((90.97 + 0.54 * pd - 0.57 * dd - 0.61 * age) * 100) / 100  // Систолический объем

    MOK_TEK = Math.round((so * bpm / 1000) * 100) / 100

    MOK_DOLZH = Math.round((0.11 * Math.pow(weight, 3 / 4)) * 100) / 100

    MOK_PERCENT = Math.round((MOK_TEK / MOK_DOLZH * 100) * 100) / 100

    Tsc = Math.round((60 / bpm) * 100) / 100  // Период сердечного цикла

    Tp = Math.round((Tsc * 0.109 + 0.159) * 100) / 100  // Период изгнания

    IMOK = Math.round(((sd + dd) * Tp / dd / (Tsc - Tp)) * 100) / 100  // Индекс текущего объема крови

    VI = Math.round(((1 - dd / bpm) * 100) * 100) / 100  // Вегетативный индекс Кердо

    BMI = Math.round((weight / ((height / 100) ** 2)) * 100) / 100  // Индекс массы тела

    OCK = Math.round(MOK_TEK / IMOK * 1000)  // ОЦК - Объем циркулирующей крови
    
    if (vsex == "man") {
        DOCK = Math.round(weight * height / 2.36)  // Должный объем циркулирующей крови
    }
    else {
        DOCK = Math.round(weight * height / 1.838)
    }
    OtklOCK = Math.round((OCK / DOCK - 1) * 100)  // Отклонение ОЦК

    console.log(pd, so, MOK_TEK, MOK_DOLZH, MOK_PERCENT, Tsc, Tp, IMOK, VI, BMI, OCK, DOCK, OtklOCK, drug)

    document.querySelector("#top1").innerHTML = "Отклонение объема циркулирующей крови: " + OtklOCK + "%";
    if (-10 <= OtklOCK && OtklOCK <= 10) {
        document.querySelector("#bot1").innerHTML = "Нормоволемия - оптимальное кровообращение";
    }
    else if (OtklOCK > 10) {
        document.querySelector("#bot1").innerHTML = "Гиперволемия";
    }
    else if (OtklOCK < -10) {
        if (70 <= MOK_PERCENT && MOK_PERCENT <= 130) {
            document.querySelector("#bot1").innerHTML = "Гиповолемия - рекомендуется наблюдение в динамике.";
        }
        else {
            document.querySelector("#bot1").innerHTML = "Гиповолемия - рекомендуется консультация специалиста";
        }
    }


    document.querySelector("#top2").innerHTML = "Индекс массы тела: " + BMI;
    if (BMI <= 16) {
        document.querySelector("#bot2").innerHTML = "Выраженный дефицит массы тела";
    }
    else if (16 < BMI && BMI <= 18.5) {
        document.querySelector("#bot2").innerHTML = "Недостаток массы тела";
    }
    else if (18.5 < BMI && BMI <= 24.9) {
        document.querySelector("#bot2").innerHTML = "Нормальная масса тела";
    }
    else if (24.9 < BMI && BMI <= 30) {
        document.querySelector("#bot2").innerHTML = "Избыточная масса тела";
    }
    else if (30 < BMI && BMI <= 35) {
        document.querySelector("#bot2").innerHTML = "Ожирение I степени";
    }
    else if (35 < BMI && BMI <= 40) {
        document.querySelector("#bot2").innerHTML = "Ожирение II степени";
    }
    else if (40 < BMI) {
        document.querySelector("#bot2").innerHTML = "Ожирение III степени";
    }
    

    if (70 <= MOK_PERCENT && MOK_PERCENT <= 130) {
        if (bpm <= 60 && VI < -10) {
            document.querySelector("#top3").innerHTML = "Минутный объем крови в норме: " + MOK_PERCENT + "%";
            document.querySelector("#bot3").innerHTML = "Ввиду высокого систолического давления и большого значения систолического объема рекомендуются консультация специалиста";
        }
        else {
            document.querySelector("#top3").innerHTML = "Минутный объем крови в норме: " + MOK_PERCENT + "%";
        }
    }
    else if (MOK_PERCENT > 130) {
        document.querySelector("#top3").innerHTML = "Минутный объем крови: " + MOK_PERCENT + "%";
        MOK_MESSAGE = "";

        if (OtklOCK < -10) {
            MOK_MESSAGE += "Неполная компенсаторная реакция на гиповолемию. ";
        }
        else if (-10 <= OtklOCK && OtklOCK <= 10) {
            MOK_MESSAGE += "Компенсаторная реакция ССС. "
        }
        else if (10 < OtklOCK) {
            MOK_MESSAGE += "Адаптационная реакция на предполагаемую физическую или психоэмоциональную нагрузку. Рекомендуется принятие решения о выборе лекарственных препаратов после рассмотрения конкретной ситуации специалистом.";
        }

        document.querySelector("#bot3").innerHTML = MOK_MESSAGE;
    }
    else if (MOK_PERCENT < 70) {
        document.querySelector("#top3").innerHTML = "Минутный объем крови: " + MOK_PERCENT + "%";
        MOK_MESSAGE = "";
        if (OtklOCK < -10) {
            MOK_MESSAGE += "Тенденция к централизации кровообращения. ";
        }

        MOK_MESSAGE += "Рекомендуется ЭКГ и АД мониторинг в динамике. ";    

        if (drug = true) {
            MOK_MESSAGE += "В зависимости от результатов необходимо сделать следующее: Если рзультат ЭКГ положительный: рекомендуется подбор адекватной терапии. Если результат ЭКГ отрицательный: рекомендуется развернутая схема диагностики сердечно-сосудистой системы.";
        }
        else {
            MOK_MESSAGE += "В зависимости от результатов необходимо сделать следующее: Если результат ЭКГ положительный: рекомендуется коррекция терапии. Если результат ЭКГ отрицательный: рекомендуется развернутая схема диагностики сердечно-сосудистой системы.";
        }
        document.querySelector("#bot3").innerHTML = MOK_MESSAGE;
    }
      
    document.querySelector("#top1").style.opacity = 1;
    document.querySelector("#bot1").style.opacity = 1;
    document.querySelector("#top2").style.opacity = 1;
    document.querySelector("#bot2").style.opacity = 1;
    document.querySelector("#top3").style.opacity = 1;
    document.querySelector("#bot3").style.opacity = 1;

    showResults(pd, so, MOK_TEK, MOK_DOLZH, MOK_PERCENT, Tsc, Tp, IMOK, VI, BMI, OCK, DOCK, OtklOCK);
}

let showResults = function(pd, so, MOK_TEK, MOK_DOLZH, MOK_PERCENT, Tsc, Tp, IMOK, VI, BMI, OCK, DOCK, OtklOCK) {
    document.querySelector("#res-inf").innerHTML = "Результаты вычисления по формулам";

    document.querySelector("#pd").innerHTML = "Пульсовое давление: ";
    document.querySelector("#pd-data").innerHTML = pd;

    document.querySelector("#so").innerHTML = "Систолический объем: ";
    document.querySelector("#so-data").innerHTML = so;

    document.querySelector("#MT").innerHTML = "Текущий минутный объем крови: ";
    document.querySelector("#MT-data").innerHTML = MOK_TEK;

    document.querySelector("#MD").innerHTML = "Должный минутный объем крови: ";
    document.querySelector("#MD-data").innerHTML = MOK_DOLZH;

    document.querySelector("#MP").innerHTML = "Процентный минутный объем крови: ";
    document.querySelector("#MP-data").innerHTML = MOK_PERCENT;

    document.querySelector("#Tsc").innerHTML = "Период сердечного цикла: ";
    document.querySelector("#Tsc-data").innerHTML = Tsc;

    document.querySelector("#Tp").innerHTML = "Период изгнания: ";
    document.querySelector("#Tp-data").innerHTML = Tp;

    document.querySelector("#IMOK").innerHTML = "Индекс минутного объема крови: ";
    document.querySelector("#IMOK-data").innerHTML = IMOK;

    document.querySelector("#VI").innerHTML = "Вегетативный индекс Кердо: ";
    document.querySelector("#VI-data").innerHTML = VI;

    document.querySelector("#BMI").innerHTML = "Индекс массы тела: ";
    document.querySelector("#BMI-data").innerHTML = BMI;

    document.querySelector("#OCK").innerHTML = "Объем циркулирующей крови: ";
    document.querySelector("#OCK-data").innerHTML = OCK;

    document.querySelector("#DOCK").innerHTML = "Должный объем циркулирующей крови: ";
    document.querySelector("#DOCK-data").innerHTML = DOCK;

    document.querySelector("#OtklOCK").innerHTML = "Отклонение объема циркулирующей крови: ";
    document.querySelector("#OtklOCK-data").innerHTML = OtklOCK;

    offOnResults(true);
}

let offOnResults = function(ex) {
    if (ex) {
        document.querySelector(".results").style.height = "625px";
        document.querySelector(".results").style.opacity = 1;
        document.querySelector(".results").style.marginLeft = "auto";
        document.querySelector(".results").style.marginRight = "auto";
        document.querySelector(".results").style.marginBottom = "35px";
        document.querySelector(".results").style.border = "1px solid rgb(88, 88, 88)";
        document.querySelector(".table-results").style.display = "table";
    }
    else {
        document.querySelector(".results").style.height = 0;
        document.querySelector(".results").style.opacity = 0;
        setTimeout(temp, 1000);
    }
}

let temp = function() {
    document.querySelector(".results").style.margin = 0;
    document.querySelector(".results").style.border = 0;
    document.querySelector(".table-results").style.display = "none";
    
}