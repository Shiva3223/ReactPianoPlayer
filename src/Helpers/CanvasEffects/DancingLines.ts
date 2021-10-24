interface Effect{
    pos_x: number,
    pos_y: number,
    color: string,
    velocity_y:number,
    velocity_x:number
    alpha:number
}

class DancingLines{
    readonly ctx:CanvasRenderingContext2D;
    readonly key_width:number;
    readonly life_time:number;
    private effect_width:number;
    private speed:number;
    private gravitation:boolean;
    private allSameSpeed:boolean;
    private effect_height:number;
    private gravitation_force:number;
    private Effects:Array<Effect>
    constructor(ctx:CanvasRenderingContext2D, keyWidth:number, lifeTime:number,effect_width:number,effect_height:number,speed?:number,allSameSpeed?:boolean,lighten?:boolean,gravitation?:boolean,gravitationForce?:number ){
        this.ctx = ctx;
        this.key_width = keyWidth;
        this.effect_width = effect_width;
        this.effect_height = effect_height;
        this.life_time = lifeTime;
        this.speed = speed === undefined ? 20 : speed;
        this.gravitation = gravitation === undefined ? true: gravitation; 
        this.allSameSpeed = allSameSpeed === undefined ? false: allSameSpeed;
        this.gravitation_force = gravitationForce === undefined? 0.5 : gravitationForce
        this.Effects = [];
        if(lighten){
            ctx.globalCompositeOperation = 'screen';
        }
        this.Rect_Floor_Alpha_ReturnNewAlpha = this.Rect_Floor_Alpha_ReturnNewAlpha.bind(this);
    }

    public AddEffect(pos_x:number,pos_y:number, color:string):void{
        const NewEffect: Effect = {
            pos_x: pos_x + Math.random() * this.key_width / 2 + this.key_width / 4,
            pos_y: pos_y,
            color: color,
            velocity_y: Math.round(this.allSameSpeed ? this.speed : Math.random() * (this.speed-2) + 2),
            velocity_x: Math.random() > 0.5 ? 1 : -1,
            alpha:1,
        }
        this.Effects.push(NewEffect);
    }

    public render():void{
        let newEffects: Array<Effect> = [];
        this.Effects.map(Effect =>{
            Effect.alpha = this.Rect_Floor_Alpha_ReturnNewAlpha(Effect.pos_x,Effect.pos_y,Effect.color,Effect.alpha);
            Effect.pos_y -= Math.random() * Effect.velocity_y;
            Effect.pos_x += Math.random() * 0.5 * Effect.velocity_x;
            Effect.velocity_x > 0 ? Effect.velocity_x += Math.random() * 0.25: Effect.velocity_x-= Math.random() * 0.25
            //
            if(this.gravitation)Effect.velocity_y -= this.gravitation_force / Effect.alpha;
            //
            Effect.alpha > 0 && newEffects.push(Effect);
            return null;
        })
        this.Effects = newEffects;
    }

    private Rect_Floor_Alpha_ReturnNewAlpha(pos_x:number,pos_y:number, color:string, alpha:number){
        this.ctx.fillStyle = color + `,${alpha})`;
        this.ctx.shadowColor = color + `,${alpha})`;
        this.ctx.fillRect(Math.floor(pos_x),Math.floor(pos_y),Math.floor(this.effect_width),Math.floor(this.effect_height));
        return alpha - 1/this.life_time;
    }

}

export default DancingLines;