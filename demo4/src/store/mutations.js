const mutation = {
	//处理rgoodsID
	changeRgoodsId(state,value){
		state.VXrgoodsId = value;
	},
	//处理询价ID
	changeRgoodsInquiryInfoId(state,value){
		state.VXrgoodsInquiryInfoId = value;
	},
	//处理手机号
	changeTel(state,value){
		state.VXtel = value;
	}
}
export default mutation;
