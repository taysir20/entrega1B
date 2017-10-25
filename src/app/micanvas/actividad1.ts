
import {Panel} from '../milib/views/panels/panel';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imgs/imagen';
import {Button} from '../milib/views/buttons/button';
import {Window} from '../milib/views/windows/window';
import {Label} from '../milib/views/labels/label';

export class Actividad1 implements EventsAdminListener{

    private motor:Motor;
    private panelMenu:Panel;
    private panelJuego:Panel;
    private imagenFondo:Imagen;
    private botonInicio:Button;
    private botonCargar:Button;
    private botonSalir:Button;
    private window1:Window;
    private respuesta1:Button;
    private respuesta2:Button;
    private respuesta3:Button;
    private respuesta4:Button;
    private lblPregunta:Label;
    private indicePreguntaSiguiente:number=0;
    private imgGanador:Imagen;
    private imgVidas:Imagen;
    private vidasJuego:number=3;
    private lblNumVidas:Label;
    private indicePreguntaAnterior:number=0;
    private preg = ["¿Cuánto fue el vuelo mas largo que a hecho una gallina?", "¿A cuantos años equivale el primer año de un perro?", "Profesión del inventor de la silla eléctrica: ", "De que estaban hechas las almuadas de los antiguos egipcios"];
    private resp = [["5 minutos", "13 segundos", "7 segundos", "No vuelan"],["4 años", "1 año", "21 años", "8 años"],["Carpintero", "Dentista", "Médico", "Policía"],["Pieles", "Paja", "Piedra", "No dormían"]];
    private respCorrecta = ["13 segundos", "21 años", "Dentista", "Piedra"];
    

    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/backmain.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.crearEscenarioMenu();
        this.crearEscenarioJuego();
        EventsAdmin.instance.addListener(this);

        
        
    }


    /**
     * OJO!! AUNQUE EN ESTE EJEMPLO SE USE EL PANEL, ES OBLIGATORIO CREAR UN OBJETO WINDOW EN EL MILIB, Y AGREGARLE EL BOTON
     * DE SALIR EN LA ESQUINA COMO SALE EN EL LA PAGINA WEB. HABRA QUE QUITAR EL PANEL Y USAR WINDOW
     */
    private crearEscenarioMenu():void{
        let pmw=DataHolder.instance.nScreenWidth*0.3;
        let pmh=DataHolder.instance.nScreenHeight*0.45;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);
        this.panelMenu=new Panel(this.motor,pmx,pmy,pmw,pmh);
        this.motor.addViewToParentView(this.imagenFondo,this.panelMenu);
        
        this.botonInicio = new Button(this.motor,this.panelMenu.w-this.panelMenu.w/1.34,this.panelMenu.h-this.panelMenu.h/1.3,this.panelMenu.w/2,this.panelMenu.h/8);
        this.botonInicio.setImagePath('./assets/btn.png');
        this.botonInicio.setTexto("Nueva partida");
        this.motor.addViewToParentView(this.panelMenu,this.botonInicio);
        this.botonInicio.setListener(this);
        
        this.botonCargar = new Button(this.motor,this.panelMenu.w-this.panelMenu.w/1.34,this.panelMenu.h-this.panelMenu.h/1.78,this.panelMenu.w/2,this.panelMenu.h/8);
        this.botonCargar.setImagePath('./assets/btn.png');
        this.botonCargar.setTexto("Cargar");
        this.motor.addViewToParentView(this.panelMenu,this.botonCargar);
        this.botonCargar.setListener(this);
        
        this.botonSalir = new Button(this.motor,this.panelMenu.w-this.panelMenu.w/1.34,this.panelMenu.h-this.panelMenu.h/2.7,this.panelMenu.w/2,this.panelMenu.h/8);
        this.botonSalir.setImagePath('./assets/btn.png');
        this.botonSalir.setTexto("Salir");
        this.motor.addViewToParentView(this.panelMenu,this.botonSalir);
        this.botonSalir.setListener(this);
    
    }

    private crearEscenarioJuego():void{

        let pmw=DataHolder.instance.nScreenWidth*0.3;
        let pmh=DataHolder.instance.nScreenHeight*0.45;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);
        this.window1=new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.motor.addViewToParentView(this.imagenFondo,this.window1);

        this.lblPregunta = new Label(this.motor,this.window1.w-this.window1.w/1.58,this.window1.h-this.window1.h/1.7,this.window1.w/5,this.window1.h/18);
        this.lblPregunta.setTexto("Pregunta");
        this.motor.addViewToParentView(this.window1,this.lblPregunta);
        this.lblPregunta.setFontColor('white');
   


        this.respuesta1 = new Button(this.motor,this.window1.w-this.window1.w/1.43,this.window1.h-this.window1.h/2.1,this.window1.w/7,this.window1.h/18);
        this.respuesta1.setImagePath('./assets/btn.png');
        this.respuesta1.setTexto(null);
        this.respuesta1.blVisible=true;
        this.motor.addViewToParentView(this.window1,this.respuesta1);
        this.respuesta1.setListener(this);
       
        this.respuesta2 = new Button(this.motor,this.window1.w-this.window1.w/1.93,this.window1.h-this.window1.h/2.1,this.window1.w/7,this.window1.h/18);
        this.respuesta2.setImagePath('./assets/btn.png');
        this.respuesta2.setTexto(null);
        this.respuesta2.blVisible=true;
        this.motor.addViewToParentView(this.window1,this.respuesta2);
        this.respuesta2.setListener(this);
        
        this.respuesta3 = new Button(this.motor,this.window1.w-this.window1.w/1.43,this.window1.h-this.window1.h/2.7,this.window1.w/7,this.window1.h/18);
        this.respuesta3.setImagePath('./assets/btn.png');
        this.respuesta3.setTexto(null);
        this.respuesta3.blVisible=true;
        this.motor.addViewToParentView(this.window1,this.respuesta3);
        this.respuesta3.setListener(this);
        

        this.respuesta4 = new Button(this.motor,this.window1.w-this.window1.w/1.93,this.window1.h-this.window1.h/2.7,this.window1.w/7,this.window1.h/18);
        this.respuesta4.setImagePath('./assets/btn.png');
        this.respuesta4.setTexto(null);
        this.respuesta4.blVisible=true;
        this.motor.addViewToParentView(this.window1,this.respuesta4);
        this.respuesta4.setListener(this);
       
        this.imgGanador = new Imagen(this.motor,pmx,pmy,pmw,pmh);
        this.imgGanador.setImg('./assets/enhorabuena.png');
        this.motor.addViewToParentView(this.window1,this.imgGanador);


        this.imgVidas = new Imagen(this.motor,pmx,pmy,pmw,pmh);
        this.imgVidas.setImg('./assets/vidas.jpg');
        this.motor.addViewToParentView(this.window1,this.imgVidas);
        this.lblNumVidas = new Label(this.motor, this.imgVidas.w-this.imgVidas.w/1.5,this.imgVidas.y,this.imgVidas.w/2,this.imgVidas.h/16);
        this.motor.addViewToParentView(this.imgVidas,this.lblNumVidas);
        
        this.window1.btnWindow.setListener(this);
        
        

   
    }


    private seteoImgGanador():void{
       
        var aux=this;
        
        this.motor.setViewVisibility(this.imgGanador.uid,true);
        this.bPreguntas(false);
        
        setTimeout(function() {
            aux.motor.setViewVisibility(aux.window1.uid,false);
            aux.motor.setViewVisibility(aux.panelMenu.uid,true);
            aux.indicePreguntaSiguiente=0;
            console.log("indice" + aux.indicePreguntaSiguiente);
          }, 3000);
          
        
    }


    private seteoImgPerdedor(numVidas:number):void{
        var aux=this;
        console.log("tus vidas son: " +numVidas);
        if(numVidas<0){
            this.vidasJuego=3;
            this.indicePreguntaSiguiente=0;
            this.indicePreguntaAnterior=0;
            this.motor.setViewVisibility(this.imgVidas.uid,true);
            this.lblNumVidas.setTexto("Has perdido!!!");
            setTimeout(function() {
                aux.motor.setViewVisibility(aux.imgVidas.uid,false);
                aux.motor.setViewVisibility(aux.window1.uid,false);
                aux.motor.setViewVisibility(aux.panelMenu.uid,true);
               
              }, 3000);

        }else{
            this.motor.setViewVisibility(this.imgVidas.uid,true);
            this.lblNumVidas.setTexto("Te quedan: " + numVidas + " vidas.");
            setTimeout(function() {
                aux.motor.setViewVisibility(aux.imgVidas.uid,false);
              }, 3000);
        }
       
        
    }


    private bPreguntas(blVisible:boolean):void{
        this.motor.setViewVisibility(this.lblPregunta.uid,blVisible);
        this.motor.setViewVisibility(this.respuesta1.uid,blVisible);
        this.motor.setViewVisibility(this.respuesta2.uid,blVisible);
        this.motor.setViewVisibility(this.respuesta3.uid,blVisible);
        this.motor.setViewVisibility(this.respuesta4.uid,blVisible);

    }

    private seteoTexto(num:number):void{
      
        if(this.resp[num]==null){
            this.seteoImgGanador();
        }else{
            this.lblPregunta.setTexto(this.preg[num]);
            for (var index = 0; index < this.resp[num].length; index++) {
                if(index==0){
                    this.respuesta1.setTexto(this.resp[num][index]);
                }else if(index==1){
                    this.respuesta2.setTexto(this.resp[num][index]);
                }else if(index==2){
                    this.respuesta3.setTexto(this.resp[num][index]);
                }else if(index==3){
                    this.respuesta4.setTexto(this.resp[num][index]);
                } 
                    
            }
        }
        
            
    }

    private continuarJuego(indicePreguntaAnterior:number){
        this.seteoTexto(indicePreguntaAnterior);
    } 


   


    buttonListenerOnClick?(btn:Button):void{
        if(btn==this.window1.btnWindow){
            this.motor.setViewVisibility(this.window1.uid,false);
            this.motor.setViewVisibility(this.panelMenu.uid,true);
        }

    if(btn==this.botonSalir){
    this.motor.setViewVisibility(this.panelMenu.uid,false);
    }

    if(btn==this.botonInicio){
    this.motor.setViewVisibility(this.panelMenu.uid,false);
    this.motor.setViewVisibility(this.window1.uid,true);
    this.motor.setViewVisibility(this.imgGanador.uid,false);
    this.motor.setViewVisibility(this.imgVidas.uid,false);
   this.indicePreguntaAnterior=this.indicePreguntaSiguiente;
 
    this.seteoTexto(this.indicePreguntaSiguiente);
    this.indicePreguntaSiguiente++;
    
    }


    if(btn==this.botonCargar){
        if(this.indicePreguntaSiguiente==0){
            console.log("No hay nada que continuar");
        }else{
            this.motor.setViewVisibility(this.panelMenu.uid,false);
            this.continuarJuego(this.indicePreguntaAnterior);
            this.motor.setViewVisibility(this.window1.uid,true);
            this.motor.setViewVisibility(this.imgVidas.uid,false);
            this.motor.setViewVisibility(this.imgGanador.uid,false);
        }
       
        
        }

    if(btn==this.respuesta1){
        this.indicePreguntaAnterior=this.indicePreguntaSiguiente;
        for (var index = 0; index < this.respCorrecta.length; index++) {
           if(this.respuesta1.getTexto()==this.respCorrecta[index]){
            console.log("es correcta");
            this.seteoTexto(this.indicePreguntaSiguiente);
            this.indicePreguntaSiguiente++;
           
           }
         
        }

        if(this.indicePreguntaSiguiente==this.indicePreguntaAnterior){
            this.seteoImgPerdedor(--this.vidasJuego);

        }


    
    }

    if(btn==this.respuesta2){
        console.log("btn2");
        this.indicePreguntaAnterior=this.indicePreguntaSiguiente;
        for (var index = 0; index < this.respCorrecta.length; index++) {
            if(this.respuesta2.getTexto()==this.respCorrecta[index]){
             console.log("es correcta");
             this.seteoTexto(this.indicePreguntaSiguiente);
             this.indicePreguntaSiguiente++;
          
            }
                   
         }

         if(this.indicePreguntaSiguiente==this.indicePreguntaAnterior){
            this.seteoImgPerdedor(--this.vidasJuego);

        }
           
           }




           if(btn==this.respuesta3){
            this.indicePreguntaAnterior=this.indicePreguntaSiguiente;
            for (var index = 0; index < this.respCorrecta.length; index++) {
                if(this.respuesta3.getTexto()==this.respCorrecta[index]){
                 console.log("es correcta");
                 this.seteoTexto(this.indicePreguntaSiguiente);
                 this.indicePreguntaSiguiente++;
               
                }
               
             }
             if(this.indicePreguntaSiguiente==this.indicePreguntaAnterior){
                this.seteoImgPerdedor(--this.vidasJuego);
    
            }
               
               }

               if(btn==this.respuesta4){
                this.indicePreguntaAnterior=this.indicePreguntaSiguiente;
                for (var index = 0; index < this.respCorrecta.length; index++) {
                    if(this.respuesta4.getTexto()==this.respCorrecta[index]){
                     console.log("es correcta");
                     this.seteoTexto(this.indicePreguntaSiguiente);
                     this.indicePreguntaSiguiente++;
                    
                    }
                  
                 }

                 if(this.indicePreguntaSiguiente==this.indicePreguntaAnterior){
                    this.seteoImgPerdedor(--this.vidasJuego);
        
                }
                   
                   }
               

                }

      
    screenSizeChanged?(vWidth:number,vHeight:number):void{

        let pmw=DataHolder.instance.nScreenWidth*0.3;
        let pmh=DataHolder.instance.nScreenHeight*0.45;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);

        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");

     
        this.imagenFondo.setSize(DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);

        this.panelMenu.setPosition(pmx,pmy);
        this.panelMenu.setSize(pmw,pmh); 

        
        this.botonInicio.setSize(this.panelMenu.w/2,this.panelMenu.h/8);
        this.botonInicio.setPosition(this.panelMenu.w-this.panelMenu.w/1.34,this.panelMenu.h-this.panelMenu.h/1.3);

        
        this.botonCargar.setSize(this.panelMenu.w/2,this.panelMenu.h/8); 
        this.botonCargar.setPosition(this.panelMenu.w-this.panelMenu.w/1.34,this.panelMenu.h-this.panelMenu.h/1.78);

        this.botonSalir.setSize(this.panelMenu.w/2,this.panelMenu.h/8);
        this.botonSalir.setPosition(this.panelMenu.w-this.panelMenu.w/1.34,this.panelMenu.h-this.panelMenu.h/2.7);

      
        this.window1.setSize(DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
      

        

        this.respuesta1.setSize(this.window1.w/7,this.window1.h/18);
        this.respuesta1.setPosition(this.window1.w-this.window1.w/1.43,this.window1.h-this.window1.h/2.1);


       

        this.respuesta2.setSize(this.window1.w/7,this.window1.h/18);
        this.respuesta2.setPosition(this.window1.w-this.window1.w/1.93,this.window1.h-this.window1.h/2.1);

        this.respuesta3.setSize(this.window1.w/7,this.window1.h/18);
        this.respuesta3.setPosition(this.window1.w-this.window1.w/1.43,this.window1.h-this.window1.h/2.7);

        this.respuesta4.setSize(this.window1.w/7,this.window1.h/18);
        this.respuesta4.setPosition(this.window1.w-this.window1.w/1.93,this.window1.h-this.window1.h/2.7);

        this.window1.btnWindow.setSize(this.window1.w/7,this.window1.h/18);
        this.window1.btnWindow.setPosition(this.window1.w-this.window1.w/5.5,this.window1.h-this.window1.h/1.04);

        

        this.lblPregunta.setSize(this.window1.w/5,this.window1.h/18);
        this.lblPregunta.setPosition(this.window1.w-this.window1.w/1.58,this.window1.h-this.window1.h/1.7);

        this.imgGanador.setSize(pmw,pmh);
        this.imgGanador.setPosition(pmx,pmy);

        this.imgVidas.setSize(pmw,pmh);
        this.imgVidas.setPosition(pmx,pmy);

        this.lblNumVidas.setSize(this.imgVidas.w/2,this.imgVidas.h/16);
        this.lblNumVidas.setPosition(this.imgVidas.w-this.imgVidas.w/1.5,this.imgVidas.y);


      
      }

    }