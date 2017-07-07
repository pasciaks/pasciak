  var ff = 1000000;
  function randRange(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function myTileObject(col, row, locationX, locationY, sizeX, sizeY, destX, destY, dx, dy, textMessage, kind) {

      this.lifespan = 0;
	    this.isHidden = false;
	    this.isTouched = false;
	    this.isSelected = false;
	    this.textMessage = textMessage;
	    this.lastTimeMoved = (new Date()).getTime();
	    this.born = (new Date()).getTime();
	    this.speed = 50;
	    this.col = col;
	    this.row = row;
	    this.locationX = locationX;
	    this.locationY = locationY;
	    this.sizeX = sizeX;
	    this.sizeY = sizeY;
	    this.destX = destX;
	    this.destY = destY;
	    this.dx = dx;
	    this.dy = dy;  
	    
	    this.visibility = 0;
	    
	    this.colorIndex = randRange(0,MAXCOLOR);
	    
	    this.colorCorrect = this.colorIndex;

	    this.foreColor = 'white'; //"#330000";		
	    this.backColor = 'none'; //"#FFFF33";		
	    this.borderColor = 'white'; //"#cc0033";	

	    this.angle = 0;

	    this.textMessage = textMessage;
	    
	    this.kind = kind;

	    if (this.dx == 0) {
	        this.dx = (this.destX - this.locationX) / 100; //Math.abs(this.destX - this.locationX);
	    }
	    if (this.dy == 0) {
	        this.dy = (this.destY - this.locationY) / 100; //Math.abs(this.destY - this.locationY);
	    }
	    return this;
	}
	
	myTileObject.prototype.toggleObject = function () {	 
	    this.colorIndex += 1;	    
	    if (this.colorIndex>MAXCOLOR) this.colorIndex = 0;	    
	    return this.colorIndex;	    
	}

	myTileObject.prototype.autoMoveObject = function (currentTime) {
    
	    if (this.lifespan > 0) {
	        if ((currentTime - this.born) > this.lifespan) {
	          if (this.isSelected === true) {
	              this.isSelected = false;
	              this.lifespan=0;
	          } else {
	            
	            this.isHidden = true;
	          }
	        }
	    }
	    
	    if (this.isHidden) return;
	    
	    // if there is a speed, is it time to move yet?		
	    if (!((currentTime - this.lastTimeMoved) > this.speed)) {
	        return;
	    }
	    
	    // move in x direction, unless it should be snapped within dx pixels
	    if (Math.abs(this.locationX - this.destX) > Math.abs(this.dx)) {
	        this.locationX += this.dx;
	    } else {
	        this.locationX = this.destX;
	    }
	    
	    // move in y direction, unless it should be snapped within dy pixels
	    if (Math.abs(this.locationY - this.destY) > Math.abs(this.dy)) {
	        this.locationY += this.dy;
	    } else {
	        this.locationY = this.destY;
	    }
	    
	    this.lastTimeMoved = currentTime;
	}

	myTileObject.prototype.moveObject = function (dx, dy) {
	    this.locationX += dx;
	    this.locationY += dy;
	    this.lastTimeMoved = (new Date()).getTime();
	}
  
  myTileObject.prototype.shift = function() {
  //  if (this.dx == 0) {
	        this.dx = (this.destX - this.locationX) / 10; //Math.abs(this.destX - this.locationX);
	  //  }
	   // if (this.dy == 0) {
	        this.dy = (this.destY - this.locationY) / 10; //Math.abs(this.destY - this.locationY);
	   // }
  }

	myTileObject.prototype.setLocation = function (whereX, whereY, steps) {
	    if (steps < 1) steps = 1;
	    this.locationX = whereX;
	    this.locationY = whereY;
	    this.dx = (this.destX - this.locationX) / steps;
	    this.dy = (this.destY - this.locationY) / steps;
	    this.lastTimeMoved = (new Date()).getTime();
	}

	myTileObject.prototype.draw = function (currentTime, ctx) {
	    
	    if (this.isHidden) return;
	    
	    if (!(this.isSelected)) {
        if (this.angle > 0) {
            var tx = this.locationX + this.sizeX / 2; 
            var ty = this.locationY + this.sizeY / 2;          
            ctx.save();          
            ctx.translate(tx, ty);
            ctx.rotate(this.angle);
            ctx.translate(-tx, -ty);
        }
	    }
	    
	    if (this.backColor == 'none') {
      
      //        this.borderColor = 'none'; //todo//xxx
      
      } else {
	      	 // back
	        ctx.fillStyle = this.backColor; 
	        ctx.fillRect(this.locationX+2, this.locationY+2, this.sizeX-4, this.sizeY-4);	     
	    }	    
	    
	    if (this.borderColor == 'none') {} else {
	       
         // border
	        
	       // ctx.lineWidth = 1;
	       //  if ( this.colorIndex == this.colorCorrect ) ctx.lineWidth = 12;
	        
	        ctx.strokeStyle = this.borderColor;
	        ctx.strokeRect(this.locationX+this.sizeX/ff, this.locationY+this.sizeY/ff, this.sizeX-2*this.sizeX/ff, this.sizeY-2*this.sizeY/ff);
	    }

    //this.foreColor='white';
    
	    if (this.foreColor == 'none') {} else {

	        // fore			
	        if (this.isSelected) {

	            ctx.fillStyle = 'white';//'#'+Math.floor(Math.random()*16777215).toString(16);//this.borderColor;	            	            
	            ctx.fillText(this.textMessage, this.locationX + this.sizeX / 2 - 2, this.locationY + this.sizeY / 2 + 2);
	        }

	        ctx.fillStyle = this.foreColor;
	        ctx.fillText(this.textMessage, this.locationX + this.sizeX / 2 - 1, this.locationY + this.sizeY / 2 + 1);
	    }
	    
	    if (!(this.isSelected)) {
        if (this.angle > 0) {
            ctx.restore();
        }
	    }

	}
