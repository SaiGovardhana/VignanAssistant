
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * 
 */
function Authenticate(req,res,next)
{

    if('name' in req.cookies)
    {
        if(req.cookies['name'] == 'root')
            next();
        else
            {   
                res.clearCookie('name');
                res.redirect('/login.html');
            }
    }
    else
        res.redirect('/login.html');

}

exports.Authenticate=Authenticate;