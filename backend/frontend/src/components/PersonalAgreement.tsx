import React from 'react';
import { Checkbox } from './base/Checkbox';

import s from './PersonalAgreement.scss';

export const PersonalAgreement = () => {
  return (
    <div className={s.PersonalAgreement}>
      <h2>Terms & Conditions</h2>
      <div className={s.PersonalAgreement__body}>
        <h4>Scheduling an Appointment</h4>
        <p>
          By scheduling an appointment on our website you wishfully agree to reserve our time. We understand that
          sometimes schedule adjustments are necessary. Therefore, we respectfully request a 24 hours notice for
          cancellations or rescheduling of appointments.
        </p>
        <br />
        <p>
          Please understand that when you forget, cancel, or change your appointment without giving enough notice, we
          miss the opportunity to fill that appointment time, and clients on our wait list miss the opportunity to
          receive services.
        </p>
        <br />
        <p>
          Any appointment late cancelled, missed, or changed without 24 hours notice will result in a charge equal to
          100% of the reserved service amount. The appointment may be taken off of a contract/package or charged
          individually.
        </p>
        <br />
        <p>
          Your appointments are confirmed electronically by email through our online appointment scheduling software.
          From this confirmation email, you have the option of the following without a charge:
        </p>
        <br />
        <p>
          cancel/reschedule/change your appointment from your online account;cancel your appointment from your online
          account;respond back by email with any changes or issues;place a call for further questions;
        </p>
        <br />
        <p>
          It is your responsibility to remember your appointment dates and times in order to prevent any missed
          appointments which result in a cancellation fee. A link to automatically upload the appointment to your
          calendar is provided on every electronic confirmation.
        </p>
        <br />
        <p>
          Any late arrival will shorten your appointment time and will not be made up by running into the next client’s
          scheduled appointment. In case you are late for more than 10 minutes we may choose to cancel your appointment
          as we cannot guarantee a satisfactory experience.
        </p>
        <br />
        <p>
          Emergency absences will be considered on an individual basis by our team. You may request not to be charged
          for the late cancelled session in writing within 7 days if you feel such action is warranted.
        </p>
        <br />
        <p>
          It is mutually understood that if a cancellation is due to circumstances beyond any of our control, such as
          power outage, unfortunate incident, or weather that requires you or us to have to cancel or be closed during
          regular business hours, we will reschedule your existing appointment and no discount or charges will apply.
        </p>
        <br />
      </div>

      <Checkbox required onChange={(e) => console.log(e)}>
        I have read and agree to the terms above *
      </Checkbox>
    </div>
  );
};

export default PersonalAgreement;
