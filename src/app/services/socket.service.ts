import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'angular-web-storage';
import { Injectable } from '@angular/core';

// [*** SOCKET-IO SERVICE ****]
// Posts, Likes, Comments, Replies and Friends Request are using this service
// "Backend Connector Service" calls below 'emitters' after receiving Response from Backend
@Injectable()
export class SocketService {

    private url = 'http://localhost:3000';
    private socket;

    constructor(private session: SessionStorageService) {
        this.socket = io(this.url);
    }

    // ************************ EMITTERS ***********************************

    public sendPost(post) {
        this.socket.emit('new-post', post);
    }

    public sendTimelinePost(timelinepost) {
        this.socket.emit('new-timeline-post', timelinepost);
    }

    public sendFriendRequest(friendrequest) {
        this.socket.emit('add-friend', friendrequest);
    }

    public sendLikes(likes) {
        this.socket.emit('set-likes', likes);
    }

    public sendComments(comments) {
        this.socket.emit('set-comments', comments);
    }

    public sendReplies(replies) {
        this.socket.emit('set-replies', replies);
    }

    // ************************ OBSERVERS *********************************
    public getRequest = () => {
        return Observable.create(
            (observer) => {
                this.socket.on('addfriend', (friendrequest) => {
                    observer.next(friendrequest);
                });
            });
    }

    public getPost = () => {
        return Observable.create(
            (observer) => { 
                this.socket.on('new-post', (post) => {
                    observer.next(post);
                });

                // return () => {
                //     this.socket.disconnect();
                // }
            });
    }

    public getTimelinePost = () => {
        return Observable.create(
            (observer) => { 
                this.socket.on('new-timeline-post', (timelinepost) => {
                    observer.next(timelinepost);
                });
            });
    }

    public getLikes = () => {
        return Observable.create(
            (observer) => {
                this.socket.on('set-likes', (likes) => {
                    observer.next(likes);
                })
            }
        )
    }

    public getComments = () => {
        return Observable.create(
            (observer) => {
                this.socket.on('set-comments', (comments) => {
                    observer.next(comments);
                })
            })
    }

    public getReplies = () => {
        return Observable.create(
            (observer) => {
                this.socket.on('set-replies', (replies) => {
                    observer.next(replies);
                })
            }
        )
    }

    // ngOnDestroy() {

    // }

} //*** Class Ends */