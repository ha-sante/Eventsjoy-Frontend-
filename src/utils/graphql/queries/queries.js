import { gql } from '@apollo/client';

exports.GET_EVENTS = gql`
  query Get_events_list{
	  get_event{
	    id,
	    event_title
	  }
	}
`;

// Used for events listings on the user dashboard

