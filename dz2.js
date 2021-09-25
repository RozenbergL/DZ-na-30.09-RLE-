/*'#' - спецсимвол*/
let fs = require('fs');
let arg = process.argv;
if (arg[3] == "code"){
	let inText;
	let i = 0, n = 1;
	let answer = "";
	fs.readFile(arg[2], (err, data) => {
		if (err){
			console.error(err);
			return;
		}
		inText = data.toString();
		while (i < inText.length){
			while(inText.charAt(i) == inText.charAt(i+n))
				n++;
			while (n > 255){
				n -= 255
				answer = answer + '#' + String.fromCharCode(255) + inText.charAt(i);
			}
			if ((n >= 3) || (inText.charAt(i) == '#')){
				answer = answer + '#' + String.fromCharCode(n) + inText.charAt(i);
			}else{
				answer = answer + inText.charAt(i).repeat(n);
			}
			i += n;
			n = 1;
		}
		console.log(answer);
		fs.writeFile('code.txt', answer, (err) => {
			if (err){
				console.err(err);
				return;
			}
			console.log('The file has been saved!');
		});
	});
}
if (arg[3] == "decode"){
	let inText;
	let i = 0;
	let answer = "";
	fs.readFile(arg[2], (err, data) => {
		if (err){
			console.error(err);
			return;
		}
		inText = data.toString();
		while (i < inText.length){
			if (inText.charAt(i) == '#'){
				let count = inText.charAt(i + 1).charCodeAt(0);
				answer = answer + inText.charAt(i + 2).repeat(count);
				i += 3;
			}else{
				answer = answer + inText.charAt(i);
				i += 1;
			}
		}
		fs.writeFile('decode.txt', answer, (err) => {
			if (err){
				console.err(err);
				return;
			}
			console.log('The file has been saved!');
		});
	});
}