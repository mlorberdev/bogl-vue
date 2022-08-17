!(function main() {
    
    let timing = false;
    function timer() {
        if (timing === false) { return; }
        const tr = document.getElementById("timer");
        const int = setInterval(() => {
            let min = Math.floor(time / 60), sec = time % 60;
            time === 0 ? endGame(int) : time -= 1;
            sec < 10 ? tr.textContent = `${min}:0${sec}` : tr.textContent = `${min}:${sec}`;
        }, 1000);
    }

    document.getElementById("menu").addEventListener("click", menu);
    document.getElementById("newGame").addEventListener("click", new_game);

    function sleep(ms) {
        return new Promise(e => setTimeout(e, ms))
    }

    function pick_dice() {
        const dice = ["AACIOT", "ABILTY", "ABJMOQ", "ACDEMP", "ACELRS", "ADENVZ", "AHMORS", "BIFORX", "DENOSW", "DKNOTU", "EEFHIY", "EGKLUY", "EGINTV", "EHINPS", "ELPSTU", "GILRUW"];
        let bb = [], pick = [];
        for (let i = 0; i < 16; i++) {
            pick.push(dice[i].charAt(Math.floor(Math.random() * 6)));
        }
        for (let i = 0; i < 16; i++) {
            let j = Math.floor(Math.random() * pick.length);
            if (pick[j] === "Q") { pick[j] = "Qu"; };
            bb[i] = pick[j];
            pick.splice(j, 1);
        }
        return bb;
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const dictionaries = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z];
    const points = [1, 4, 4, 2, 1, 4, 3, 3, 1, 10, 5, 2, 4, 2, 1, 4, 10, 1, 1, 1, 2, 5, 4, 8, 3, 10];
    const connected = [[4, 5, 1], [0, 4, 5, 6, 2], [1, 3, 5, 6, 7], [2, 6, 7], [0, 1, 5, 8, 9], [0, 1, 2, 4, 6, 8, 9, 10], [1, 2, 3, 5, 7, 9, 10, 11], [2, 3, 6, 10, 11], [4, 5, 9, 12, 13], [4, 5, 6, 8, 10, 12, 13, 14], [5, 6, 7, 9, 11, 13, 14, 15], [6, 7, 10, 14, 15], [8, 9, 13], [8, 9, 10, 12, 14], [9, 10, 11, 13, 15], [10, 11, 14]];
    let pp = [], tempWord = [], wordList = [], score = 0, inputs = [], board, ttt = document.getElementById("tempWord");

    async function new_game() {
        await sleep(1);

        let wh = 40, lr = [100, 25], fs = 2.5;
        if (!document.getElementById("hideWords").checked) { wh = 30, lr = [50, 0], fs = 2; }
        let gt = document.getElementsByName("timeGroup");
        for (let i = 0; i < gt.length; i++) { if (gt[i].checked) { time = gt[i].value; break } }
        // RESETS
        board = pick_dice(); pp = [];
        document.getElementById("numWordsMade").innerHTML = "0";
        document.getElementById("words").innerHTML = "";
        document.getElementById("words").style.color = "rgba(255, 255, 255, 0)";
        document.getElementById("score").innerHTML = "0";
        document.getElementById("wrapper").style.width = document.getElementById("wrapper").style.height = wh + "vh";
        document.getElementById("wrapper").style.fontSize = `${fs}em`;
        document.getElementById("right").style.left = `${lr[0]}vw`;
        document.getElementById("left").style.left = `${lr[1]}vw`;
        document.getElementById("score").style.display = "block";
        document.getElementById("wordsMade").style.display = "block";
        menu();
        
        let possible = [];
        let k = 0;
        // TRAVERSE ALL 2-LETTER PATHS (84) AND STORE AS NUMBER ARRAYS [i,j] IN possible ARRAY
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < connected[i].length; j++) {
                possible.push([i, connected[i][j]]);
            }
        }
        // TRAVERSE ALL 3- TO 8-LETTER PATHS and ...
        function traverse() {
            let n = possible.length;
            for (let i = k; i < n; i++) {
                for (let j = 0; j < 16; j++) {
                    if (connected[possible[i][possible[i].length - 1]].includes(j) && !possible[i].includes(j)) {
                        possible.push(possible[i].concat(j));
                    }
                }
            }
            k = n + 1;
            if (n < 55009) { traverse(); }
            else { replace(); }
        }
        traverse();

        // REPLACE NUMBERS WITH LETTERS
        function replace() {
            for (let i = 0; i < 16; i++) {
                if (board[i] === "Qu") {
                    board[i] = "QU";
                }
            }
            let l = possible.length;
            for (let i = 0; i < l; i++) {
                let www = "";
                for (let j = 0; j < possible[i].length; j++) {
                    www += board[possible[i][j]];
                }
                possible[i] = www;
            }
            findGood();
        }

        function findGood() {
            // SEARCH ALL POSSIBLE WORDS ARE IN DICTIONARY; dd IS DICTIONARY TO SEARCH, ele IS possible[i]
            let bSearch = function (dd, ele) {
                let start = 0;
                let end = dd.length - 1;
                let middle = Math.floor(start + end / 2);
                while (dd[middle] !== ele && start <= end) {
                    if (ele < dd[middle]) {
                        end = middle - 1;
                    } else {
                        start = middle + 1;
                    }
                    middle = Math.floor((start + end) / 2)
                }
                return dd[middle] === ele ? middle : -1;
            }
            for (let i = 0; i < possible.length; i++) {
                let dd;
                for (let j = 0; j < 26; j++) {
                    if (letters[j] === possible[i].charAt(0)) {
                        dd = dictionaries[j];
                        break;
                    }
                }
                let isGood = bSearch(dd, possible[i]);
                if (isGood !== -1) {
                    pp.push(possible[i]);
                }
            }
            pp = [...new Set(pp)];
            pp.sort();
            return;
        }
        setupBoard();
    }

    function setupBoard() {
        // console.log(timing);
        let bs = "";
        timing = true;
        timer();
        for (let i = 0; i < 16; i++) {
            if (board[i] === "QU") { board[i] = "Qu"; }
            bs += `<div class="cell"><span id="c${i}" class="tar"><span class="ltr">${board[i]}</span></span></div>`;
        }
        document.getElementById("wrapper").innerHTML = bs;
        document.getElementById("possibleWords").innerHTML = pp.length;
        document.getElementById("words").innerHTML = `<span>${pp.toString().split(',').join(',&nbsp</span><span>')}</span>`;
        listen();
    };

    function listen() {
        for (let i = 0; i < 16; i++) {
            document.getElementById(`c${i}`).addEventListener("mousedown", makeWord);
        }
    }

    // ON MOUSE DOWN, MAKING WORD FROM MOUSEOVER LETTERS
    function makeWord() {
        inputs.push(Number(this.id.toString().split('c')[1]));
        let tempLetter = this.innerText;
        tempWord.push(tempLetter);
        ttt.innerText += tempLetter;
        this.parentElement.classList.add("used");
        for (let i = 0; i < 16; i++) {
            document.getElementById(`c${i}`).addEventListener("mouseover", concat);
        }
        window.addEventListener("mouseup", stopMakeword);
    }

    function concat() {
        let x = Number(this.id.toString().split('c')[1]);
        if (connected[inputs[inputs.length - 1]].includes(x) && !document.getElementById(this.id).parentElement.classList.contains("used")) {
            inputs.push(x);
            ttt.innerText += this.innerText;
            tempWord.push(this.innerText);
            document.getElementById(this.id).parentElement.classList.add("used");
        }
    }

    // CHECK USER INPUT WORD IS IN DICTIONARY
    function stopMakeword() {
        let wrds = document.getElementById("numWordsMade");
        if (tempWord[0] === "Qu") {
            tempWord[0] = "Q";
            tempWord.splice(1, 0, "U");
        }
        for (let i = 0; i < 26; i++) {
            if (tempWord[0] === letters[i]) {
                arr = dictionaries[i];
                break;
            }
        }
        let ele = tempWord.join('');
        let binarySearch = function (arr, ele) {
            let start = 0;
            let end = arr.length - 1;
            let middle = Math.floor(start + end / 2);
            while (arr[middle] !== ele && start <= end) {
                if (ele < arr[middle]) {
                    end = middle - 1;
                } else {
                    start = middle + 1;
                }
                middle = Math.floor((start + end) / 2)
            }
            return arr[middle] === ele ? middle : -1;
        }
        let isInDictionary = binarySearch(arr, ele);
        let tempScore = 0;

        function applyEffects(w) {
            for (i in inputs) {
                let inp = document.getElementById(`c${inputs[i]}`);
                inp.parentElement.classList.add(w);
                setTimeout(() => {
                    inp.parentElement.classList.remove(w);
                }, 200);
            }
        }

        if (wordList.includes(ele)) { applyEffects("played"); }
        else if (isInDictionary === -1) { applyEffects("bad"); }
        else {
            applyEffects("good");
            wordList.push(ele); // add to list of played words
            highlight(ele);
            for (let i = 0; i < tempWord.length; i++) {
                for (let j = 0; j < 26; j++) {
                    if (tempWord[i] === letters[j]) {
                        tempScore += points[j];
                        continue;
                    }
                }
            }
            wrds.innerHTML = wordList.length;
            increaseScore(tempWord.length, tempScore);
            // createParticles(e.clientX, e.clientY);
        }
        // remove listeners
        for (let i = 0; i < 16; i++) {
            document.getElementById(`c${i}`).removeEventListener("mouseover", concat);
            document.getElementById(`c${i}`).parentElement.classList.remove("used");
        }
        ttt.innerText = "";
        tempWord = [];
        inputs = [];
        window.removeEventListener("mouseup", stopMakeword);
    }

    // HIGHLIGHT MADE WORD IN words
    function highlight(w) {
        for (let i = 0; i < pp.length; i++) {
            if (pp[i] === w) {
                pp.splice(i, 1, `<span class="bright">${w}</span>`);
                document.getElementById("words").innerHTML = `<span>${pp.toString().split(',').join(',&nbsp</span><span>')}</span>`;
                break;
            }
        }
    }

    // ANIMATE SCORE INCREASE
    function increaseScore(l, tempScore) {
        switch (true) {
            case (l === 5): tempScore *= 2; break;
            case (l === 6): tempScore *= 3; break;
            case (l > 6): tempScore *= 4; break;
        }
        let int = setInterval(() => {
            if (tempScore === 0) {
                clearInterval(int);
                return;
            }
            score++;
            tempScore--;
            document.getElementById("score").innerHTML = score;
        }, 20);
    }

    // END GAME
    function endGame() {
        timing = false;
        document.getElementById("words").innerHTML = `<span>${pp.toString().split(',').join(',&nbsp</span><span>')}</span>`;
        document.getElementById("words").style.color = "rgba(255, 255, 255, 0.4)";
        document.getElementById("wrapper").style.width = document.getElementById("wrapper").style.height = "30vw";
        document.getElementById("wrapper").style.fontSize = "2em";
        document.getElementById("right").style.left = "50vw";
        document.getElementById("left").style.left = "0";
        for (let i = 0; i < 16; i++) {
            document.getElementById(`c${i}`).removeEventListener("mousedown", makeWord);
        }
    }

    // PROFILE
    function profile() {
        document.getElementById("mainMenu").classList.add("hide");
        document.getElementById("profileMenu").classList.remove("hide");
        console.log("profile");
    }

    // PLAY FRIEND
    function playFriend() {
        let pf = pick_dice();
        console.log(pf);
    }

    // RETURN TO MAIN MENU
    function goHome() {
        document.getElementById("profileMenu").classList.add("hide");
        document.getElementById("mainMenu").classList.remove("hide");
    }

    function menu() {
        let hs = document.getElementById("homescreen");
        if (hs.classList.contains("open")) {
            hs.style.display = "none"; // close menu
            hs.classList.toggle("open");
            document.getElementById("l_0").style.transform = "rotate(0deg)";
            document.getElementById("l_2").style.transform = "rotate(0deg)";
            document.getElementById("l_1").style.opacity = "1";
        } else {
            hs.style.display = "flex"; // open menu
            hs.classList.toggle("open");
            document.getElementById("l_0").style.transform = "rotate(43deg)";
            document.getElementById("l_2").style.transform = "rotate(-43deg)";
            document.getElementById("l_1").style.opacity = "0";
        }
    }
 

})();
