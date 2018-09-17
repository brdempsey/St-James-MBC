let Dates = [
    1945, 1962, 1981, 1982, 
    1995, 1996, 1999, 2001,
    2002, 2005, 2007, 2008,
    2009, 2010, 2012, 2015];
 
 
 
$(document).ready(function(){
    
    $('.LearnMore').click(function(){
    
    let date = $(this).text();
    
        $.each(Dates, function(){
             DisplayHistory(date);
             RemoveHistory(date);
        });
     
        });
    });
 
 
 
/* $(document).ready(function(){
    
    
    $('.LearnMore').click(function(){
        
        let date = $(this).text();
        
        for(let i=0; i<Dates.length; i++){
            if(date == Dates[i]){
                
                DisplayHistory(date);
                RemoveHistory(date);
            }
        }
    }); */
    
    
 
function DisplayHistory(date){
       $('.TableSpace').fadeOut('slow');
       $('#H' + date + ':hidden').fadeIn(2000);
} 
 
function RemoveHistory(date){
    
    $('.ExitDescription').click(function(){
            $('#H' + date).fadeOut(0);
            $('.TableSpace').fadeIn(1000);
      });
}