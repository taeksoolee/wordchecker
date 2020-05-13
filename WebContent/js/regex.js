var regex = {
	member: {
		email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
		password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
		nickname: /^[a-zA-Z~`!@#$%\/\/^&*()-+=0-9가-힣]{1,10}$/,
		birthday: /^[0-9]{4}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$/,
	},
	word: {
		speling: /^[a-zA-Z]{0,30}$/,
		meaning: /^[가-힣]{0,30}$/,
	},
	board: {
		title: /^.{1,30}$/,
		content: /^.{0,50}$/,
	},
	date: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
		
}

export const validation = {
	validateEmail : (email) => {return regex.member.email.test(email);},
	validatePassword : (password) => {return regex.member.password.test(password);},
	validateNickname : (nickname) => {return regex.member.nickname.test(nickname);},
	validateBirthday : (birthday) => {return regex.member.birthday.test(birthday);},
	validateSpeling : (speling) => {return regex.word.speling.test(speling);},
	validateMeaning : (meaning) => {return regex.word.meaning.test(meaning);},
	validateTitle : (title) => {return regex.board.title.test(title);},
	validateContent : (Content) => {return regex.board.Content.test(Content);}
}