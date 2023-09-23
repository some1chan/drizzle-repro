-- Create or replace the function
CREATE OR REPLACE FUNCTION public.insert_vote(
    IN poll_id uuid,
    IN voting_user_id uuid,
    IN choice_ids uuid[]
) RETURNS TABLE (
    status text,
    existing_choices uuid[],
    votes_created uuid[],
    votes_deleted uuid[],
	max_votes smallint
) AS $BODY$
BEGIN
	-- Left empty
END;
$BODY$ LANGUAGE plpgsql;
