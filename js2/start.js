const main = document.querySelector("#main");   //const : 상수 선언
const qna = document.querySelector("#qna");   
const result = document.querySelector("#result")

const endPoint = 12;   //statusBar 표시를 위해
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

function callResult(){  
    var result = select.indexOf(Math.max(...select));
    return result;
}
function setResult(){
    let point = callResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block"
        },400)
    })
    setResult();
    callResult();
}
function addAnswer(answerText, qIdx,idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');   //answer변수에 html에서 버튼 만들듯이 javascript로 버튼 만듦
    answer.classList.add('answerList');   //클래스리스트를 만들어서 버튼 3개가 한 번에 움직일 수 있도록 함
    answer.classList.add('my-5');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);   //answer가 a에 소속되도록. 즉, div 내에 버튼이 생김
    answer.innerHTML = answerText;
    answer.addEventListener("click",function(){   //answer을 클릭하면 
        var children = document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++){   //버튼 3개 중 아무거나 선택해도 비활성화 됨
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 1s"
            children[i].style.animation = "fadeOut 1s";
        }
        setTimeout(()=>{
            var target = qnaList[qIdx].a[idx].type;   //몇 번째 질문에서 몇 번째를 선택했는지 담음
            for(let j=0; j<target.length; j++){   //type 반복
                select[target[j]] += 1;
            }
            for(let i=0; i<children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);   //다음 질문으로 넘어감
        },400)  
    },false);
}
function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }
    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q;   //data.js의 q를 불러옴
    for(let i in qnaList[qIdx].a){   //data.js의 a를 for문으로 불러옴
        addAnswer(qnaList[qIdx].a[i].answer, qIdx,i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';   //statusBar 길이 설정
}
function begin(){
    main.style.WebkitAnimation = "fadeOut 1s"
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s"
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        },400)
        let qIdx = 0;
        goNext(qIdx);   //맨 처음에 0이 선택돼야 하므로 변수 지정하여 함수 호출
    },400);
}