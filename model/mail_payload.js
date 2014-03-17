/**
 * Created by rahulguha on 23/02/14.
 */
exports.Mail_payload = function (to, cc, subject, msg_body)
        {
            this.to = to;
            this.cc = cc;
            this.subject = subject;
            this.msg_body = msg_body;

        }
