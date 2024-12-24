<?php
header("Content-Type: application/json");

// Include the database connection
include 'config.php';

// Get the data from the POST request
$data = json_decode(file_get_contents("php://input"));

// Validate the incoming data (user_id and candidate_id)
if (isset($data->user_id) && isset($data->candidate_id)) {
    $user_id = $data->user_id;
    $candidate_id = $data->candidate_id;

    // Prepare SQL query to insert the saved candidate record
    $sql = "INSERT INTO saved_candidates (user_id, candidate_id) VALUES (?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ii", $user_id, $candidate_id);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Candidate saved successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to save candidate"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to prepare statement"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Missing user_id or candidate_id"]);
}

// Close the connection
$conn->close();
?>
