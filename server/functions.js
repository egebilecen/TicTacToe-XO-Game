module.exports =
{
    log : function(msg,mode="info")
    {
        if (mode === "info")
            msg = "[?]-"+msg;

        console.log(msg);
    }
};