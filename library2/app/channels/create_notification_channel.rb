class CreateNotificationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'create_notification'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
