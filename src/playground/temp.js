<SingleDatePicker
                            date={this.state.createdAt}
                            onDateChange={
                                (createdAt)=>{
                                createdAt && this.setState({createdAt})
                            }}
                            focused={this.state.calFocussed}
                            onFocusChange={({ focused }) => { this.setState({ calFocussed:focused }); }}
                            numberOfMonths={1}
                            isOutsideRange={()=>false}
                            >
                        </SingleDatePicker>
                        
                        <select className="options" onChange={(e)=>{
                            this.option=e.target.value;
                            if (this.option!= 'Choose Category') {
                                this.categoryCnt += 1;
                                console.log(this.option + ':' + this.categoryCnt);
                                
                                this.setState({
                                    text: this.state.text + '\n' +
                                        this.categoryCnt + ']' + ' ' +
                                        this.option.toUpperCase() + ':-\n'
                                })

                            }
                            
                            // this.mytext+=this.categoryCnt+']'+this.option+':-\n'
                            // this.setState({
                            //     text: this.mytext
                            // })
                            // console.log('this.mytext:-'+this.mytext);

                           
                        }}>
                            <option value="React">React</option>
                            <option value="Javascript">Javascript</option>
                            <option value="Resume">Resume</option>
                            <option value="Css animation">Css animation</option>
                            <option value="Choose Category" selected>Choose Category</option>
                        </select>

                        <textarea className='textArea1'placeholder="ENTER STATUS REPORT" value={this.state.text} onInput={(e)=>{
                            

                             this.setState({
                                 text: e.target.value
                             })

                             this.category[this.option] = e.target.value
                            

                            console.log('this.category:-'+JSON.stringify(this.category));
            
                        }}>
                        </textarea>
                         <button className="btn2"> Add Report
                        </button>