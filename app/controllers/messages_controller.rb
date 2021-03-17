class MessagesController < ApplicationController
  def index
    @message = Message.new
    @room = Room.find(params[:room_id])
    @messages = @room.messages.includes(:user)
  end

  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.new(message_params)
    if @message.save      
      render json:{
        id: @message.id,
        content: @message.content,
        user_name: @message.user.name,
        created_at: I18n.l(@message.created_at),
        image: @message.image.attached? ? helpers.rails_representation_url(@message.image.variant(resize: '500x500'), only_path: true) : nil,
      } and return
    else
      @messages = @room.messages.includes(:user)
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
end

#12行目はAjaxにする前の「redirect_to room_messages_path(@room)」はいらない
#