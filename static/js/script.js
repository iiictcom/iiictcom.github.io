

/*
* -----------------------------------------tab--------------------------------------------
*/

function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

//设为首页 www.ecmoban.com

function SetHome(obj,url){

    try{

        obj.style.behavior='url(#default#homepage)';

       obj.setHomePage(url);

   }catch(e){

       if(window.netscape){

          try{

              netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

         }catch(e){

              alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");

          }

       }else{

        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");

       }

  }

}