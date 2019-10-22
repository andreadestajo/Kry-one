module.exports =
{
	login (request, response)
	{
		return "login";
	},
	registration (data, context)
	{
	    console.log(data)
	    console.log('pwede na besh')
            return "registration"
	},
    verifyEmail(request, response) {
	    return null
    }
};

