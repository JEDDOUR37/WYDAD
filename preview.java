const hourE1=document.queryselector(."hour");
const minuteE1=document.queryselector(."minute")
const secondE1=document.queryselector(."second")

function updateclock(){
    const currentdATA=new data();
    settimeout(updateclock,1000);
    const hour=currentdATA.gethours();
      const minute=currentdATA.getminutes();
        const secondr=currentdATA.getseconds();
        consthourdeg=(hour/12)*360;

}