export const userlogin = (logininfo) => {
	// console.log('USERLOGIN ACTION:-'+this.email+':'+this.passwd);
	return ({
			type: 'USER_LOGIN',
			logininfo
			
		
		});
	}