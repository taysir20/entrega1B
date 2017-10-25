import {View} from '../view';
import {Motor} from '../../engines/motor';
import {Label} from '../labels/label';
import {EventsAdmin,EventsAdminListener} from '../../events/eventsadmin';
import {Imagen} from '../imgs/imagen';
import {Button} from '../buttons/button';
/**
 * Clase que hereda de View y se encarga de pintar un elemento visual compuesto Boton por un Label y una Imagen.
 */
export class Window extends View{

    private sColor:string=null;
    private imgBack:Imagen=null;
    public btnWindow:Button;
  

    
    /**
     * Metodo de inicializacion de los elementos visuales en el Boton. Se ejecuta ak finalizar el constructor del padre (View)
     */
    /*public initFinish():void{
    
        this.imgBack=new Imagen(this.motor,0,0,this.w,this.h);
        this.motor.addViewToParentView(this,this.imgBack);

        this.lblTexto=new Label(this.motor,0,0,this.w,this.h);
        this.lblTexto.setTexto("Boton");        
        this.motor.addViewToParentView(this,this.lblTexto);

        EventsAdmin.instance.addMouseClickToView(this);

    }*/

    constructor(vmotor:Motor,vX:number,vY:number,vW:number,vH:number){
        super(vmotor,vX,vY,vW,vH);
        /*
        this.imgBack=new Imagen(this.motor,0,0,this.w,this.h);
        this.motor.addViewToParentView(this,this.imgBack);
        */
      
 
        this.btnWindow = new Button(this.motor,this.w-this.w/5.5,this.h-this.h/1.04,this.w/7,this.h/18);
        this.btnWindow.setImagePath('./assets/btn.png');
        this.btnWindow.setTexto("Volver a menu");
        this.btnWindow.blVisible=true;
        this.motor.addViewToParentView(this,this.btnWindow);
        this.btnWindow.setListener(this);
        this.blVisible=false;

   
        
    }

    /**
     * Metodo de setter para el listener que escuche los eventos del boton.
    
    /**

     * Metodo que fija la imagen de fondo para el boton, que llama al metodo setImg de la clase Imagen
     * @param vsPath String que contendra la ruta a la imagen en los ASSETS. Ej: './assets/btnsback/back1.png'
     */
    public setImagePath(vsPath:string):void{
        this.imgBack.setImg(vsPath);
    }
    
    /**
     * Metodo que setea el color de fondo del boton.
     */
    public setColor(vsColor:string):void{
        this.sColor=vsColor;
    }
    
    /**
     * Metodo paint del boton (ademas de pintar los hijos, label e imagen, aqui iria el codigo que queramos dar al boton (padre)
     * para pintarse)
     * @param vctx Contexto donde se va a pintar
     */
    paint(vctx:CanvasRenderingContext2D){
        
        //console.log(this.xa+"========== "+this.ya);
    }



    /**
     * Metodo para setear el texto del boton.
     * @param vtexto String: Texto del boton.
     */
   

    /**
     * Metodo heredado del padre View que se ejecutara cuando detecte que en el View se ha pinchado con el raton.
     * @param e Evento de MouseEvent con los detalles del evento.
     */
    
   
    buttonListenerOnClick?(btn:Button):void{
     
    }
}

/**
 * Interface que representara el listener del Boton.
 */

    /**
     * Metodo de notificacion del boton para avisar de que se ha presionado en el boton.
     */
  
   


