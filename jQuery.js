function $(element){
	return new Myjquery(element)
}


function Myjquery(element){
	if(typeof element == 'string'){
		if(/^[a-zA-Z][A-Za-z1-6]{0,10}$/.test(element)){
			let obj = document.getElementsByTagName(element)		
			for(let i = 0;i < obj.length;i++){
				this[i] = obj[i];
			}
			this.length = obj.length;
		}else if(/^<[a-zA-Z][A-Za-z1-6]{0,10}>$/.test(element)){
			this[0] = document.createElement(element.slice(1,-1));
			this.length = 1;

		}	
	}else if(typeof element == 'function'){
		window.addEventListener('load',element)
	}else if(typeof element == 'object' && element.nodeType == 1){
		this[0] = element;
		this.length = 1;
	}
}
Myjquery.prototype = {
	each:function(callback){
		for(let i = 0;i < this.length;i++){
			callback(i,this[i])
		}

	},
	html:function(value){
		this.each(function(index,obj){
			obj.innerHTML = value;
		})
		return this;
	},
	css:function(attrobj){
		this.each(function(index,obj){
			for(i in attrobj){
				obj.style[i] = attrobj[i];//变量
			}
		})	
		return this;
	},
	click:function(fn){
		this.each(function(index,obj){
			obj.addEventListener('click',fn,false)
		})
		return this;
	},
	classadd:function(ele){
		this.each(function(index,obj){
			obj.classList.add(ele)
		})
		return this;
	},
	removeadd:function(ele){
		this.each(function(index,obj){
			obj.classList.remove(ele)
		})
		return this;
	},
	setAttribute:function(aa,bb){
		if(arguments.length == 1){
			console.log(this[0])
			return this[2].getAttribute(aa)
		}else if(arguments.length == 2){
			this.each(function(index,obj){
				obj.setAttribute(aa,bb)
			})
			return this;
		}	
	},
	appendTo:function(select){
		let objs = document.querySelectorAll(select);
		objs.forEach(ele =>{
			let ox = this[0].cloneNode(true);
			ele.appendChild(ox)
		})
		return this;
	},
	append:function(child){
		for(let i = 0;i < this.length;i++){
			let element = document.createElement(child.slice(1,-1))
			this[i].appendChild(element);
		}
		return this;
	}	
}




