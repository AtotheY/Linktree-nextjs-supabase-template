-- below is the get_analytics function that we will call from our API route.
-- copy+paste and run this in supabase's sql editor in your project to create the function.

CREATE OR REPLACE FUNCTION get_analytics(start_date timestamp, end_date timestamp)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    WITH views_by_link AS (
        SELECT link_id, COUNT(*) as total_views
        FROM link_analytics
        WHERE event_type = 'view'
          AND created_at >= start_date
          AND created_at <= end_date
        GROUP BY link_id
        ORDER BY total_views DESC
    ),
    views_by_country AS (
        SELECT country, COUNT(*) as total_views
        FROM link_analytics
        WHERE event_type = 'view'
          AND created_at >= start_date
          AND created_at <= end_date
        GROUP BY country
        ORDER BY total_views DESC
    ),
    views_by_referrer AS (
        SELECT source, COUNT(*) as total_views
        FROM link_analytics
        WHERE event_type = 'view'
          AND created_at >= start_date
          AND created_at <= end_date
        GROUP BY source
        ORDER BY total_views DESC
    ),
    views_over_time AS (
        SELECT created_at::date as date, COUNT(*) as total_views
        FROM link_analytics
        WHERE event_type = 'view'
          AND created_at >= start_date
          AND created_at <= end_date
        GROUP BY date
        ORDER BY date ASC
    )
    SELECT json_build_object(
        'date_range', json_build_object('start_date', start_date, 'end_date', end_date),
        'views_by_link', COALESCE((SELECT json_agg(row_to_json(views_by_link)) FROM views_by_link), '[]'::json),
        'views_by_country', COALESCE((SELECT json_agg(row_to_json(views_by_country)) FROM views_by_country), '[]'::json),
        'views_by_referrer', COALESCE((SELECT json_agg(row_to_json(views_by_referrer)) FROM views_by_referrer), '[]'::json),
        'views_over_time', COALESCE((SELECT json_agg(row_to_json(views_over_time)) FROM views_over_time), '[]'::json)
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;